/**
 * Presets & Knowledge Base
 * Rich configurations for site categories, design vibes, color palettes, and typography pairings.
 */

export const SITE_TYPES = [
  {
    id: 'portfolio',
    title: 'Personal Portfolio & Resume',
    badge: 'Career & Freelance',
    icon: 'briefcase',
    description: 'Showcase your skills, projects, background, and get hired or land freelance clients.',
    defaultSections: ['nav', 'hero', 'about', 'skills', 'projects', 'testimonials', 'contact', 'footer'],
    recommendedVibes: ['modern-slate', 'cyber-dark', 'minimal-swiss', 'oceanic-teal', 'monokai-ember'],
    heroPlaceholder: {
      headline: "Crafting digital experiences with precision & heart",
      subhead: "Full-stack developer & UI designer focused on building fast, accessible web applications that solve real-world problems.",
      cta: "View My Projects"
    }
  },
  {
    id: 'business',
    title: 'Local Business & Professional Service',
    badge: 'Clients & Sales',
    icon: 'store',
    description: 'Attract local clients, explain your services, display reviews, and get bookings/inquiries.',
    defaultSections: ['nav', 'hero', 'features', 'about', 'testimonials', 'pricing', 'faq', 'contact', 'footer'],
    recommendedVibes: ['organic-warm', 'clean-editorial', 'modern-slate', 'nordic-pine', 'sunset-ochre'],
    heroPlaceholder: {
      headline: "Reliable, high-quality craft you can count on",
      subhead: "Serving our local community with top-tier craft, fair pricing, and 10+ years of proven expertise.",
      cta: "Schedule a Consultation"
    }
  },
  {
    id: 'product',
    title: 'Product & SaaS Landing Page',
    badge: 'Conversion & Growth',
    icon: 'rocket',
    description: 'Convert visitors into customers with high-converting feature breakdowns, pricing, and social proof.',
    defaultSections: ['nav', 'hero', 'features', 'social-proof', 'pricing', 'faq', 'cta-banner', 'footer'],
    recommendedVibes: ['modern-slate', 'vibrant-creative', 'cyber-dark', 'oceanic-teal'],
    heroPlaceholder: {
      headline: "The modern toolkit to streamline your workflow",
      subhead: "Eliminate repetitive tasks, automate your pipeline, and give your team hours back every week.",
      cta: "Start Free 14-Day Trial"
    }
  },
  {
    id: 'creative',
    title: 'Creative Studio & Photography',
    badge: 'Visual Arts',
    icon: 'camera',
    description: 'Immersive visual storytelling, photo galleries, case studies, and commission inquiries.',
    defaultSections: ['nav', 'hero', 'gallery', 'about', 'services', 'testimonials', 'contact', 'footer'],
    recommendedVibes: ['minimal-swiss', 'clean-editorial', 'crimson-luxe', 'minimal-rose', 'neon-synthwave'],
    heroPlaceholder: {
      headline: "Capturing authentic moments that linger",
      subhead: "Editorial and documentary photography exploring texture, emotion, and natural light.",
      cta: "Explore Gallery"
    }
  },
  {
    id: 'restaurant',
    title: 'Restaurant, Cafe & Bakery',
    badge: 'Hospitality',
    icon: 'coffee',
    description: 'Mouth-watering food presentation, digital menu, story, hours, and reservation inquiries.',
    defaultSections: ['nav', 'hero', 'about', 'menu', 'features', 'testimonials', 'contact', 'footer'],
    recommendedVibes: ['organic-warm', 'coffee-roast', 'sunset-ochre', 'botanical-olive'],
    heroPlaceholder: {
      headline: "Handmade pastries & slow-roasted coffee every morning",
      subhead: "Crafted with locally sourced heritage grains, organic butter, and boundless love.",
      cta: "Browse Our Daily Menu"
    }
  },
  {
    id: 'blog',
    title: 'Blog, Publication & Knowledge Hub',
    badge: 'Content & Reading',
    icon: 'book-open',
    description: 'Share articles, tutorials, essays, and grow an email subscriber base with clean typography.',
    defaultSections: ['nav', 'hero', 'featured-posts', 'categories', 'about', 'newsletter', 'footer'],
    recommendedVibes: ['clean-editorial', 'minimal-swiss', 'organic-warm', 'coffee-roast'],
    heroPlaceholder: {
      headline: "Deep dives on engineering, design, and self-reliance",
      subhead: "Weekly essays exploring how to build things properly from first principles.",
      cta: "Read Latest Edition"
    }
  },
  {
    id: 'community',
    title: 'Community, Club & Non-Profit',
    badge: 'Impact & Mission',
    icon: 'heart',
    description: 'Rally people around a shared cause, announce events, and recruit members or volunteers.',
    defaultSections: ['nav', 'hero', 'about', 'features', 'events', 'faq', 'contact', 'footer'],
    recommendedVibes: ['vibrant-creative', 'organic-warm', 'botanical-olive', 'nordic-pine'],
    heroPlaceholder: {
      headline: "Building a healthier, greener neighborhood together",
      subhead: "Join 450+ neighbors planting urban orchards, sharing tools, and fostering community resilience.",
      cta: "Join Our Next Gathering"
    }
  }
];

export const PALETTE_CATEGORIES = [
  { id: 'all', label: 'All Palettes', icon: '🎨' },
  { id: 'tech', label: 'Modern & Tech', icon: '💻' },
  { id: 'warm', label: 'Warm & Earthy', icon: '🌿' },
  { id: 'editorial', label: 'Editorial & Luxe', icon: '📰' },
  { id: 'vibrant', label: 'Bold & Vibrant', icon: '⚡' },
  { id: 'dark', label: 'Dark & Terminal', icon: '🌌' },
  { id: 'pastel', label: 'Pastel & Soft', icon: '🌸' }
];

export const DESIGN_VIBES = [
  {
    id: 'modern-slate',
    category: 'tech',
    title: 'Modern Slate & Indigo',
    badge: 'Crisp & Professional',
    description: 'Tech-forward, polished, balanced high-contrast aesthetic suitable for SaaS, dev portfolios, and modern businesses.',
    colors: {
      bg: '#f8fafc',
      surface: '#ffffff',
      primary: '#4f46e5',
      primaryHover: '#4338ca',
      accent: '#06b6d4',
      text: '#0f172a',
      textMuted: '#64748b',
      border: '#e2e8f0',
      heroBg: '#ffffff'
    },
    typography: {
      headingFont: 'Plus Jakarta Sans',
      bodyFont: 'Inter',
      googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap',
      headingWeight: '700',
      borderRadius: '8px'
    }
  },
  {
    id: 'organic-warm',
    category: 'warm',
    title: 'Warm Earth & Terracotta',
    badge: 'Cozy & Approachable',
    description: 'Natural, wholesome tones of terracotta, warm linen, and forest sage. Perfect for bakeries, craft makers, and wellness.',
    colors: {
      bg: '#faf7f2',
      surface: '#ffffff',
      primary: '#c25e37',
      primaryHover: '#a74d2b',
      accent: '#476e5c',
      text: '#292524',
      textMuted: '#78716c',
      border: '#e7e0d5',
      heroBg: '#f5efe6'
    },
    typography: {
      headingFont: 'Playfair Display',
      bodyFont: 'DM Sans',
      googleFontsUrl: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap',
      headingWeight: '600',
      borderRadius: '12px'
    }
  },
  {
    id: 'clean-editorial',
    category: 'editorial',
    title: 'Luxe Navy & Champagne Gold',
    badge: 'Timeless & Elegant',
    description: 'Sophisticated deep navy paired with warm gold and crisp typography. Great for consultants, law firms, and luxury brands.',
    colors: {
      bg: '#fdfbf7',
      surface: '#ffffff',
      primary: '#1e293b',
      primaryHover: '#0f172a',
      accent: '#d97706',
      text: '#1e293b',
      textMuted: '#64748b',
      border: '#e2e8f0',
      heroBg: '#f8fafc'
    },
    typography: {
      headingFont: 'Cormorant Garamond',
      bodyFont: 'Montserrat',
      googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Montserrat:wght@400;500;600&display=swap',
      headingWeight: '700',
      borderRadius: '4px'
    }
  },
  {
    id: 'vibrant-creative',
    category: 'vibrant',
    title: 'Vibrant Coral & Electric Mint',
    badge: 'Energetic & Bold',
    description: 'Fresh, youthful, and punchy. Drives enthusiasm for creative studios, game startups, youth events, and bold creators.',
    colors: {
      bg: '#ffffff',
      surface: '#fcfcfd',
      primary: '#f43f5e',
      primaryHover: '#e11d48',
      accent: '#10b981',
      text: '#18181b',
      textMuted: '#71717a',
      border: '#f4f4f5',
      heroBg: '#fff1f2'
    },
    typography: {
      headingFont: 'Space Grotesk',
      bodyFont: 'Plus Jakarta Sans',
      googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&family=Space+Grotesk:wght@600;700&display=swap',
      headingWeight: '700',
      borderRadius: '16px'
    }
  },
  {
    id: 'cyber-dark',
    category: 'dark',
    title: 'Cyber Dark & Emerald Glow',
    badge: 'Developer & Terminal',
    description: 'Deep midnight palette with sharp glowing emerald highlights and crisp contrast for engineering portfolios and tech labs.',
    colors: {
      bg: '#090d16',
      surface: '#111827',
      primary: '#10b981',
      primaryHover: '#059669',
      accent: '#38bdf8',
      text: '#f9fafb',
      textMuted: '#9ca3af',
      border: '#1f2937',
      heroBg: '#0b1120'
    },
    typography: {
      headingFont: 'Syne',
      bodyFont: 'JetBrains Mono',
      googleFontsUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Syne:wght@700;800&display=swap',
      headingWeight: '800',
      borderRadius: '6px'
    }
  },
  {
    id: 'minimal-swiss',
    category: 'tech',
    title: 'Swiss Minimalist (International Style)',
    badge: 'Clean & Architectural',
    description: 'Stark black-and-white harmony with an iconic International Klein Blue accent. Perfect for architects, photographers, and purists.',
    colors: {
      bg: '#ffffff',
      surface: '#f8f8f8',
      primary: '#09090b',
      primaryHover: '#27272a',
      accent: '#2563eb',
      text: '#09090b',
      textMuted: '#52525b',
      border: '#e4e4e7',
      heroBg: '#ffffff'
    },
    typography: {
      headingFont: 'Outfit',
      bodyFont: 'Inter',
      googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Outfit:wght@600;700&display=swap',
      headingWeight: '700',
      borderRadius: '2px'
    }
  },
  {
    id: 'nordic-pine',
    category: 'warm',
    title: 'Nordic Pine & Alpine White',
    badge: 'Organic & Crisp',
    description: 'Deep alpine evergreen paired with misty frost and clean linen. Ideal for outdoor brands, forestry, wellness, and architecture.',
    colors: {
      bg: '#f4f7f5',
      surface: '#ffffff',
      primary: '#1b4332',
      primaryHover: '#143526',
      accent: '#52b788',
      text: '#132a13',
      textMuted: '#58725f',
      border: '#d8e3dc',
      heroBg: '#edf2ee'
    },
    typography: {
      headingFont: 'Cabin',
      bodyFont: 'Nunito Sans',
      googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Cabin:wght@600;700&family=Nunito+Sans:wght@400;500;600&display=swap',
      headingWeight: '700',
      borderRadius: '10px'
    }
  },
  {
    id: 'sunset-ochre',
    category: 'warm',
    title: 'Sunset Ochre & Amber Gold',
    badge: 'Radiant & Warm',
    description: 'Rich desert golden hour tones, sun-baked sandstone, and warm terra umber. Great for travel, artisan goods, and culinary studios.',
    colors: {
      bg: '#fdf9f3',
      surface: '#ffffff',
      primary: '#d97706',
      primaryHover: '#b45309',
      accent: '#ea580c',
      text: '#292524',
      textMuted: '#78716c',
      border: '#f2e8dc',
      heroBg: '#f8ede1'
    },
    typography: {
      headingFont: 'Fraunces',
      bodyFont: 'Inter',
      googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap',
      headingWeight: '700',
      borderRadius: '12px'
    }
  },
  {
    id: 'neon-synthwave',
    category: 'dark',
    title: 'Neon Synthwave & Midnight',
    badge: 'Futuristic & Electric',
    description: 'Dark obsidian base energized with vivid neon magenta and electric cyan. Tailored for music producers, streamers, and gaming.',
    colors: {
      bg: '#0d0b18',
      surface: '#161327',
      primary: '#ec4899',
      primaryHover: '#db2777',
      accent: '#06b6d4',
      text: '#f8fafc',
      textMuted: '#a5b4fc',
      border: '#2a244d',
      heroBg: '#110d22'
    },
    typography: {
      headingFont: 'Space Grotesk',
      bodyFont: 'JetBrains Mono',
      googleFontsUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@600;700&display=swap',
      headingWeight: '700',
      borderRadius: '8px'
    }
  },
  {
    id: 'coffee-roast',
    category: 'warm',
    title: 'Rich Coffee & Oat Milk',
    badge: 'Artisanal & Relaxed',
    description: 'Dark roast espresso, velvety oat milk foam, and warm caramel accents. Crafted for coffee shops, roasters, and cozy bistros.',
    colors: {
      bg: '#f7f4ee',
      surface: '#ffffff',
      primary: '#4a3525',
      primaryHover: '#38271a',
      accent: '#c08552',
      text: '#2b2118',
      textMuted: '#7d6e63',
      border: '#e4dcce',
      heroBg: '#eee7da'
    },
    typography: {
      headingFont: 'Lora',
      bodyFont: 'Source Sans 3',
      googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Source+Sans+3:wght@400;500;600&display=swap',
      headingWeight: '600',
      borderRadius: '10px'
    }
  },
  {
    id: 'oceanic-teal',
    category: 'tech',
    title: 'Oceanic Teal & Marine',
    badge: 'Refreshing & Trustworthy',
    description: 'Abyssal navy base paired with refreshing tropical teal and calm seafoam. Excellent for medical tech, fintech, and marine ventures.',
    colors: {
      bg: '#f0fdfa',
      surface: '#ffffff',
      primary: '#0f766e',
      primaryHover: '#115e59',
      accent: '#14b8a6',
      text: '#134e4a',
      textMuted: '#5eead4',
      border: '#ccfbf1',
      heroBg: '#e6fffa'
    },
    typography: {
      headingFont: 'Plus Jakarta Sans',
      bodyFont: 'Inter',
      googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap',
      headingWeight: '700',
      borderRadius: '8px'
    }
  },
  {
    id: 'botanical-olive',
    category: 'warm',
    title: 'Botanical Olive & Sage',
    badge: 'Natural & Earthy',
    description: 'Muted Mediterranean olive, botanical eucalyptus sage, and warm cream. Perfect for sustainable design, plants, and natural goods.',
    colors: {
      bg: '#f6f7f2',
      surface: '#ffffff',
      primary: '#3d5a45',
      primaryHover: '#2d4333',
      accent: '#839788',
      text: '#253328',
      textMuted: '#687b6c',
      border: '#dde3dc',
      heroBg: '#edf0e8'
    },
    typography: {
      headingFont: 'Playfair Display',
      bodyFont: 'Inter',
      googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap',
      headingWeight: '600',
      borderRadius: '10px'
    }
  },
  {
    id: 'pastel-lavender',
    category: 'pastel',
    title: 'Pastel Lavender & Soft Plum',
    badge: 'Gentle & Calming',
    description: 'Soothing French lavender, whisper-soft orchid, and calm charcoal typography. Ideal for meditation, beauty, and wellness studios.',
    colors: {
      bg: '#faf8fc',
      surface: '#ffffff',
      primary: '#7c3aed',
      primaryHover: '#6d28d9',
      accent: '#ec4899',
      text: '#2e1065',
      textMuted: '#7c6999',
      border: '#ede9fe',
      heroBg: '#f3effa'
    },
    typography: {
      headingFont: 'Outfit',
      bodyFont: 'Plus Jakarta Sans',
      googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Outfit:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap',
      headingWeight: '700',
      borderRadius: '14px'
    }
  },
  {
    id: 'monokai-ember',
    category: 'dark',
    title: 'Monokai Pro Ember & Charcoal',
    badge: 'Developer Pro',
    description: 'Matte carbon charcoal background with vivid ember orange, electric lime, and razor-sharp contrast for software engineers.',
    colors: {
      bg: '#131417',
      surface: '#1c1e24',
      primary: '#f97316',
      primaryHover: '#ea580c',
      accent: '#84cc16',
      text: '#f3f4f6',
      textMuted: '#9ca3af',
      border: '#2d3139',
      heroBg: '#181a1f'
    },
    typography: {
      headingFont: 'Syne',
      bodyFont: 'JetBrains Mono',
      googleFontsUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Syne:wght@700;800&display=swap',
      headingWeight: '800',
      borderRadius: '6px'
    }
  },
  {
    id: 'crimson-luxe',
    category: 'editorial',
    title: 'Royal Crimson & Velvet Night',
    badge: 'Dramatic & High Impact',
    description: 'Deep imperial crimson on a rich dark canvas with champagne gold accents. Designed for theater, film, and high-end fashion.',
    colors: {
      bg: '#0f0a0c',
      surface: '#1a1115',
      primary: '#e11d48',
      primaryHover: '#be123c',
      accent: '#fbbf24',
      text: '#fff1f2',
      textMuted: '#fda4af',
      border: '#331a23',
      heroBg: '#140c10'
    },
    typography: {
      headingFont: 'Cormorant Garamond',
      bodyFont: 'Montserrat',
      googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Montserrat:wght@400;500;600&display=swap',
      headingWeight: '700',
      borderRadius: '4px'
    }
  },
  {
    id: 'minimal-rose',
    category: 'pastel',
    title: 'Minimal Rose & Slate',
    badge: 'Chic & Delicate',
    description: 'Subtle blush undertones, muted rose highlights, and slate gray type. Tailored for florists, lifestyle blogs, and boutique brands.',
    colors: {
      bg: '#fffafb',
      surface: '#ffffff',
      primary: '#be185d',
      primaryHover: '#9d174d',
      accent: '#fb7185',
      text: '#371e29',
      textMuted: '#836573',
      border: '#fce7f3',
      heroBg: '#fff1f6'
    },
    typography: {
      headingFont: 'Playfair Display',
      bodyFont: 'DM Sans',
      googleFontsUrl: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap',
      headingWeight: '600',
      borderRadius: '12px'
    }
  }
];

export const ALL_SECTIONS = [
  { id: 'nav', name: 'Responsive Header & Navigation', required: true, desc: 'Logo, page links, mobile menu toggle button.' },
  { id: 'hero', name: 'Hero Banner', required: true, desc: 'Main headline, value hook, call to action button, visual element.' },
  { id: 'about', name: 'About / Story Section', required: false, desc: 'Who you are, mission, background, why visitors should trust you.' },
  { id: 'features', name: 'Features / Services Grid', required: false, desc: 'Cards detailing what you offer, with icons and benefit descriptions.' },
  { id: 'projects', name: 'Projects / Case Studies', required: false, desc: 'Portfolio cards with thumbnails, tech tags, and project links.' },
  { id: 'gallery', name: 'Visual Media Gallery', required: false, desc: 'Responsive grid of photographs or artwork.' },
  { id: 'skills', name: 'Skills & Tech Stack', required: false, desc: 'Badges and categorized lists of competencies.' },
  { id: 'menu', name: 'Menu / Offerings Showcase', required: false, desc: 'Categorized items, descriptions, and price tags.' },
  { id: 'testimonials', name: 'Testimonials & Reviews', required: false, desc: 'Social proof cards with quotes, client avatars, and ratings.' },
  { id: 'pricing', name: 'Pricing Tiers Table', required: false, desc: 'Side-by-side comparison cards with a highlighted popular plan.' },
  { id: 'faq', name: 'Interactive FAQ Accordion', required: false, desc: 'Click-to-expand common questions and answers.' },
  { id: 'contact', name: 'Accessible Contact Form', required: false, desc: 'Input fields for name, email, message, and form validation.' },
  { id: 'footer', name: 'Footer & Site Map', required: true, desc: 'Copyright notice, social links, secondary navigation.' }
];

export const EXPERIENCE_LEVELS = [
  {
    id: 'beginner',
    title: 'Absolute Beginner',
    subtitle: 'Never coded before or know very little',
    description: 'We explain every single HTML tag, syntax rule, CSS property, and file path from scratch in friendly, plain English.'
  },
  {
    id: 'curious',
    title: 'Familiar Tinkerer',
    subtitle: 'Know some HTML/CSS basics',
    description: 'Focus on modern CSS Grid, Flexbox layouts, responsive design patterns, and clean file organization without the fluff.'
  },
  {
    id: 'aspiring-pro',
    title: 'Craftsman / Refresher',
    subtitle: 'Looking for modern best practices',
    description: 'Deep dive into WCAG accessibility, semantic document outlines, mobile-first performance, and zero-server forms.'
  }
];
