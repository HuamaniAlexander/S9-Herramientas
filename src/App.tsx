import React, { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { HapticProvider } from './context/HapticContext';
import { CartProvider } from './context/CartContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BottomTabBar } from './components/BottomTabBar';
import { NativeImageGallery } from './components/NativeImageGallery';
import { CartDrawer } from './components/CartDrawer';
import { HapticSettingsModal } from './components/HapticSettingsModal';
import { DeviceFrameSimulator } from './components/DeviceFrameSimulator';

import { HomeScreen } from './screens/HomeScreen';
import { PromotionsScreen } from './screens/PromotionsScreen';
import { GalleryScreen } from './screens/GalleryScreen';
import { DiagnosticsScreen } from './screens/DiagnosticsScreen';
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';

import { preloadImages } from './utils/imagePreloader';
import { INITIAL_PRODUCTS, GALLERY_ITEMS } from './data/products';

const AppContent: React.FC = () => {
  const { currentScreen } = useNavigation();

  // Preload all critical media assets immediately on mount for zero-latency inspection
  useEffect(() => {
    const urls = [
      ...INITIAL_PRODUCTS.map((p) => p.imageUrl),
      ...GALLERY_ITEMS.map((g) => g.imageUrl),
    ];
    preloadImages(urls);
  }, []);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'promotions':
        return <PromotionsScreen />;
      case 'gallery':
        return <GalleryScreen />;
      case 'diagnostics':
        return <DiagnosticsScreen />;
      case 'login':
        return <LoginScreen />;
      case 'register':
        return <RegisterScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <DeviceFrameSimulator>
      <div className="min-h-screen flex flex-col justify-between bg-[#f8f9ff] dark:bg-[#070d18] text-[#0b1c30] dark:text-[#f8f9ff] selection:bg-[#00d2ff] selection:text-[#0b1c30]">
        <Header />
        <main className="flex-1 w-full pb-16 md:pb-0">
          {renderScreen()}
        </main>
        <Footer />
        <BottomTabBar />
        <NativeImageGallery />
        <CartDrawer />
        <HapticSettingsModal />
      </div>
    </DeviceFrameSimulator>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <HapticProvider>
        <CartProvider>
          <NavigationProvider>
            <AppContent />
          </NavigationProvider>
        </CartProvider>
      </HapticProvider>
    </ThemeProvider>
  );
}
