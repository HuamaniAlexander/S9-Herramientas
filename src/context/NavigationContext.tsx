import React, { createContext, useContext, useState, useEffect } from 'react';
import { ScreenName, DeviceFrameMode, GalleryItem } from '../types';
import { GALLERY_ITEMS } from '../data/products';
import { HapticEngine } from '../utils/haptics';

interface NavigationContextType {
  currentScreen: ScreenName;
  navigate: (screen: ScreenName, params?: { galleryId?: string }) => void;
  goBack: () => void;
  canGoBack: boolean;
  activeGalleryItem: GalleryItem | null;
  openGalleryModal: (item: GalleryItem) => void;
  closeGalleryModal: () => void;
  deviceFrameMode: DeviceFrameMode;
  setDeviceFrameMode: (mode: DeviceFrameMode) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('home');
  const [history, setHistory] = useState<ScreenName[]>(['home']);
  const [activeGalleryItem, setActiveGalleryItem] = useState<GalleryItem | null>(null);
  const [deviceFrameMode, setDeviceFrameModeState] = useState<DeviceFrameMode>('responsive');

  const navigate = (screen: ScreenName, params?: { galleryId?: string }) => {
    HapticEngine.trigger('light');
    if (screen !== currentScreen) {
      setHistory((prev) => [...prev, screen]);
      setCurrentScreen(screen);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (params?.galleryId) {
      const found = GALLERY_ITEMS.find((g) => g.id === params.galleryId);
      if (found) {
        setActiveGalleryItem(found);
      }
    }
  };

  const goBack = () => {
    if (history.length > 1) {
      HapticEngine.trigger('selection');
      const newHistory = [...history];
      newHistory.pop(); // remove current
      const prevScreen = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setCurrentScreen(prevScreen);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openGalleryModal = (item: GalleryItem) => {
    HapticEngine.trigger('medium');
    setActiveGalleryItem(item);
  };

  const closeGalleryModal = () => {
    HapticEngine.trigger('selection');
    setActiveGalleryItem(null);
  };

  const setDeviceFrameMode = (mode: DeviceFrameMode) => {
    HapticEngine.trigger('selection');
    setDeviceFrameModeState(mode);
  };

  // Keyboard shortcut support for gallery navigation & Esc to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeGalleryItem) {
        closeGalleryModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeGalleryItem]);

  return (
    <NavigationContext.Provider
      value={{
        currentScreen,
        navigate,
        goBack,
        canGoBack: history.length > 1,
        activeGalleryItem,
        openGalleryModal,
        closeGalleryModal,
        deviceFrameMode,
        setDeviceFrameMode,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useNavigation must be used within NavigationProvider');
  return ctx;
};
