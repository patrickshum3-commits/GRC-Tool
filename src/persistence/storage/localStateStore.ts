import { AppState } from '@/domain/types';
import { sampleState } from '@/seed/sampleData';

const STORAGE_KEY = 'grc-tool-state-v1';

export const localStateStore = {
  load(): AppState {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return sampleState;

    try {
      return JSON.parse(raw) as AppState;
    } catch {
      return sampleState;
    }
  },

  save(state: AppState): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  },

  reset(): AppState {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleState));
    return sampleState;
  }
};
