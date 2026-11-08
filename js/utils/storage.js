/**
 * LocalStorage Manager
 * Stores project specifications, checklist progress, and custom preferences.
 */

const STORAGE_KEY = 'webcraft_project_v1';
const PROGRESS_KEY = 'webcraft_progress_v1';
const PLAYGROUND_KEY = 'webcraft_playground_v1';

export const Storage = {
  getProject() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.warn('Could not read from localStorage', e);
      return null;
    }
  },

  saveProject(projectData) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projectData));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  },

  getProgress() {
    try {
      const data = localStorage.getItem(PROGRESS_KEY);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  },

  saveProgress(progressData) {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progressData));
    } catch (e) {
      console.warn('Could not save progress', e);
    }
  },

  toggleChecklistItem(milestoneId, checkItemId) {
    const progress = this.getProgress();
    const key = `${milestoneId}:${checkItemId}`;
    progress[key] = !progress[key];
    this.saveProgress(progress);
    return progress[key];
  },

  isItemChecked(milestoneId, checkItemId) {
    const progress = this.getProgress();
    return !!progress[`${milestoneId}:${checkItemId}`];
  },

  getPlayground() {
    try {
      const data = localStorage.getItem(PLAYGROUND_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  savePlayground(codeData) {
    try {
      localStorage.setItem(PLAYGROUND_KEY, JSON.stringify(codeData));
    } catch (e) {
      console.warn('Could not save playground code', e);
    }
  },

  clearAll() {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(PROGRESS_KEY);
    localStorage.removeItem(PLAYGROUND_KEY);
  }
};
