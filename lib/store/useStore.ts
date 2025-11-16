import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface CursorState {
  position: { x: number; y: number };
  isHovering: boolean;
  cursorText: string;
  cursorVariant: 'default' | 'hover' | 'drag' | 'text';
}

interface ScrollState {
  scrollY: number;
  scrollProgress: number;
  scrollDirection: 'up' | 'down';
  isScrolling: boolean;
}

interface AppState {
  // Loading state
  isLoading: boolean;
  loadingProgress: number;
  setLoading: (loading: boolean) => void;
  setLoadingProgress: (progress: number) => void;

  // Cursor state
  cursor: CursorState;
  setCursorPosition: (x: number, y: number) => void;
  setCursorHovering: (hovering: boolean) => void;
  setCursorText: (text: string) => void;
  setCursorVariant: (variant: CursorState['cursorVariant']) => void;

  // Scroll state
  scroll: ScrollState;
  setScrollY: (y: number) => void;
  setScrollProgress: (progress: number) => void;
  setScrollDirection: (direction: ScrollState['scrollDirection']) => void;
  setIsScrolling: (scrolling: boolean) => void;

  // Theme
  theme: 'dark' | 'light';
  toggleTheme: () => void;

  // Sound
  soundEnabled: boolean;
  toggleSound: () => void;

  // Performance mode
  performanceMode: 'high' | 'medium' | 'low';
  setPerformanceMode: (mode: 'high' | 'medium' | 'low') => void;

  // Current section
  currentSection: string;
  setCurrentSection: (section: string) => void;

  // Modal states
  isProjectModalOpen: boolean;
  selectedProject: string | null;
  openProjectModal: (projectId: string) => void;
  closeProjectModal: () => void;
}

export const useStore = create<AppState>()(
  subscribeWithSelector((set) => ({
    // Loading
    isLoading: true,
    loadingProgress: 0,
    setLoading: (loading) => set({ isLoading: loading }),
    setLoadingProgress: (progress) => set({ loadingProgress: progress }),

    // Cursor
    cursor: {
      position: { x: 0, y: 0 },
      isHovering: false,
      cursorText: '',
      cursorVariant: 'default',
    },
    setCursorPosition: (x, y) =>
      set((state) => ({
        cursor: { ...state.cursor, position: { x, y } },
      })),
    setCursorHovering: (hovering) =>
      set((state) => ({
        cursor: { ...state.cursor, isHovering: hovering },
      })),
    setCursorText: (text) =>
      set((state) => ({
        cursor: { ...state.cursor, cursorText: text },
      })),
    setCursorVariant: (variant) =>
      set((state) => ({
        cursor: { ...state.cursor, cursorVariant: variant },
      })),

    // Scroll
    scroll: {
      scrollY: 0,
      scrollProgress: 0,
      scrollDirection: 'down',
      isScrolling: false,
    },
    setScrollY: (y) =>
      set((state) => ({
        scroll: { ...state.scroll, scrollY: y },
      })),
    setScrollProgress: (progress) =>
      set((state) => ({
        scroll: { ...state.scroll, scrollProgress: progress },
      })),
    setScrollDirection: (direction) =>
      set((state) => ({
        scroll: { ...state.scroll, scrollDirection: direction },
      })),
    setIsScrolling: (scrolling) =>
      set((state) => ({
        scroll: { ...state.scroll, isScrolling: scrolling },
      })),

    // Theme
    theme: 'dark',
    toggleTheme: () =>
      set((state) => ({
        theme: state.theme === 'dark' ? 'light' : 'dark',
      })),

    // Sound
    soundEnabled: true,
    toggleSound: () =>
      set((state) => ({
        soundEnabled: !state.soundEnabled,
      })),

    // Performance
    performanceMode: 'high',
    setPerformanceMode: (mode) => set({ performanceMode: mode }),

    // Current section
    currentSection: 'hero',
    setCurrentSection: (section) => set({ currentSection: section }),

    // Modals
    isProjectModalOpen: false,
    selectedProject: null,
    openProjectModal: (projectId) =>
      set({ isProjectModalOpen: true, selectedProject: projectId }),
    closeProjectModal: () =>
      set({ isProjectModalOpen: false, selectedProject: null }),
  }))
);

// Selectors for performance
export const useScrollProgress = () => useStore((state) => state.scroll.scrollProgress);
export const useCursorPosition = () => useStore((state) => state.cursor.position);
export const useCurrentSection = () => useStore((state) => state.currentSection);
export const useTheme = () => useStore((state) => state.theme);
export const usePerformanceMode = () => useStore((state) => state.performanceMode);
