/**
 * Pure JavaScript ZIP Archive Creator
 * Generates standard PKZip 2.0 archives without external dependencies.
 */

// CRC32 Lookup Table
const CRC_TABLE = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let j = 0; j < 8; j++) {
    c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  }
  CRC_TABLE[i] = c;
}

function calculateCrc32(data) {
  let crc = 0 ^ (-1);
  for (let i = 0; i < data.length; i++) {
    crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ data[i]) & 0xFF];
  }
  return (crc ^ (-1)) >>> 0;
}

export class SimpleZip {
  constructor() {
    this.files = [];
  }

  /**
   * Add a text or binary file to the archive
   * @param {string} path - File path inside the zip (e.g. "css/style.css")
   * @param {string|Uint8Array} content - File content
   */
  file(path, content) {
    let bytes;
    if (typeof content === 'string') {
      bytes = new TextEncoder().encode(content);
    } else if (content instanceof Uint8Array) {
      bytes = content;
    } else {
      bytes = new Uint8Array(content);
    }

    this.files.push({
      path: path.replace(/\\/g, '/'),
      bytes,
      crc: calculateCrc32(bytes)
    });
  }

  /**
   * Generates the binary Blob representing the .zip archive
   * @returns {Blob}
   */
  generateBlob() {
    const encoder = new TextEncoder();
    const parts = [];
    const centralDirectoryHeaders = [];
    let currentOffset = 0;

    const now = new Date();
    // DOS Date & Time format
    const dosTime = ((now.getHours() << 11) | (now.getMinutes() << 5) | (Math.floor(now.getSeconds() / 2))) & 0xFFFF;
    const dosDate = (((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate()) & 0xFFFF;

    for (const file of this.files) {
      const filenameBytes = encoder.encode(file.path);
      const uncompressedSize = file.bytes.length;
      const compressedSize = uncompressedSize; // Stored (no compression)

      // Local File Header (30 bytes + filename)
      const localHeader = new Uint8Array(30 + filenameBytes.length);
      const view = new DataView(localHeader.buffer);

      view.setUint32(0, 0x04034B50, true); // Signature
      view.setUint16(4, 20, true);          // Version needed (2.0)
      view.setUint16(6, 0, true);           // Flags
      view.setUint16(8, 0, true);           // Compression: 0 (Stored)
      view.setUint16(10, dosTime, true);
      view.setUint16(12, dosDate, true);
      view.setUint32(14, file.crc, true);
      view.setUint32(18, compressedSize, true);
      view.setUint32(22, uncompressedSize, true);
      view.setUint16(26, filenameBytes.length, true);
      view.setUint16(28, 0, true);          // Extra field length
      localHeader.set(filenameBytes, 30);

      parts.push(localHeader);
      parts.push(file.bytes);

      // Save info for Central Directory Header (46 bytes + filename)
      const centralHeader = new Uint8Array(46 + filenameBytes.length);
      const cView = new DataView(centralHeader.buffer);

      cView.setUint32(0, 0x02014B50, true); // Signature
      cView.setUint16(4, 20, true);          // Version made by
      cView.setUint16(6, 20, true);          // Version needed
      cView.setUint16(8, 0, true);           // Flags
      cView.setUint16(10, 0, true);          // Compression: 0
      cView.setUint16(12, dosTime, true);
      cView.setUint16(14, dosDate, true);
      cView.setUint32(16, file.crc, true);
      cView.setUint32(20, compressedSize, true);
      cView.setUint32(24, uncompressedSize, true);
      cView.setUint16(28, filenameBytes.length, true);
      cView.setUint16(30, 0, true);          // Extra field length
      cView.setUint16(32, 0, true);          // Comment length
      cView.setUint16(34, 0, true);          // Disk start
      cView.setUint16(36, 0, true);          // Internal attributes
      cView.setUint32(38, 0, true);          // External attributes
      cView.setUint32(42, currentOffset, true); // Offset of local header
      centralHeader.set(filenameBytes, 46);

      centralDirectoryHeaders.push(centralHeader);

      currentOffset += localHeader.length + file.bytes.length;
    }

    const centralDirectoryStart = currentOffset;
    let centralDirectorySize = 0;

    for (const ch of centralDirectoryHeaders) {
      parts.push(ch);
      centralDirectorySize += ch.length;
    }

    // End of Central Directory Record (22 bytes)
    const eocd = new Uint8Array(22);
    const eView = new DataView(eocd.buffer);
    eView.setUint32(0, 0x06054B50, true);
    eView.setUint16(4, 0, true);          // Disk number
    eView.setUint16(6, 0, true);          // Disk with central dir
    eView.setUint16(8, this.files.length, true);  // Entries on this disk
    eView.setUint16(10, this.files.length, true); // Total entries
    eView.setUint32(12, centralDirectorySize, true);
    eView.setUint32(16, centralDirectoryStart, true);
    eView.setUint16(20, 0, true);         // Comment length

    parts.push(eocd);

    return new Blob(parts, { type: 'application/zip' });
  }
}
