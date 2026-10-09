import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useCart } from '../context/CartContext';
import { useHaptics } from '../context/HapticContext';
import { ScreenName } from '../types';

interface TabItem {
  key: ScreenName | 'cart';
  label: string;
  icon: string;
  badge?: number;
}

export const BottomTabBar: React.FC = () => {
  const { currentScreen, navigate } = useNavigation();
  const { totalItems, setIsOpen } = useCart();
  const { trigger } = useHaptics();

  const tabs: TabItem[] = [
    { key: 'home', label: 'Inicio', icon: 'home' },
    { key: 'promotions', label: 'Ofertas', icon: 'percent' },
    { key: 'gallery', label: 'Galería', icon: 'photo_library' },
    { key: 'diagnostics', label: 'Tester', icon: 'speed' },
    { key: 'login', label: 'Cuenta', icon: 'person' },
    { key: 'cart', label: 'Canasta', icon: 'shopping_bag', badge: totalItems },
  ];

  const handleTabPress = (item: TabItem) => {
    trigger('selection');
    if (item.key === 'cart') {
      setIsOpen(true);
    } else {
      navigate(item.key as ScreenName);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0b1424]/95 backdrop-blur-md border-t border-[#e2e8f0] dark:border-[#1e2a3f] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] py-1 px-2 safe-area-pb">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive =
            tab.key !== 'cart' &&
            (tab.key === currentScreen ||
              (tab.key === 'login' && currentScreen === 'register'));

          return (
            <button
              key={tab.key}
              onClick={() => handleTabPress(tab)}
              className={`relative flex flex-col items-center justify-center py-1.5 px-2 min-w-[56px] transition-all duration-150 select-none ${
                isActive
                  ? 'text-[#00677f] dark:text-[#00d2ff]'
                  : 'text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-white'
              }`}
            >
              {/* Active Photonic Indicator Top Bar */}
              {isActive && (
                <span className="absolute top-0 w-6 h-0.5 bg-[#00d2ff] shadow-[0_0_8px_#00d2ff]" />
              )}

              {/* Icon Container with Badge */}
              <div className="relative flex items-center justify-center">
                <span
                  className={`material-symbols-outlined text-[22px] transition-transform ${
                    isActive ? 'scale-110 font-bold' : ''
                  }`}
                >
                  {tab.icon}
                </span>

                {/* Badge for Cart or updates */}
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-2 px-1 py-0.2 bg-[#00d2ff] text-[#0b1c30] font-space text-[9px] font-bold rounded-none leading-tight shadow-sm">
                    {tab.badge}
                  </span>
                )}
              </div>

              {/* Tab Label */}
              <span
                className={`font-space text-[10px] uppercase tracking-wider mt-0.5 ${
                  isActive ? 'font-bold' : 'font-medium'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
