import React, { createContext, useContext, useState } from 'react';
import { HapticType, SwitchAudioProfile } from '../types';
import { HapticEngine } from '../utils/haptics';

interface HapticContextType {
  vibrationEnabled: boolean;
  soundEnabled: boolean;
  audioProfile: SwitchAudioProfile;
  volume: number;
  isSettingsOpen: boolean;
  setVibrationEnabled: (val: boolean) => void;
  setSoundEnabled: (val: boolean) => void;
  setAudioProfile: (val: SwitchAudioProfile) => void;
  setVolume: (val: number) => void;
  setIsSettingsOpen: (val: boolean) => void;
  trigger: (type?: HapticType) => void;
}

const HapticContext = createContext<HapticContextType | undefined>(undefined);

export const HapticProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vibrationEnabled, setVib] = useState<boolean>(true);
  const [soundEnabled, setSnd] = useState<boolean>(true);
  const [audioProfile, setProf] = useState<SwitchAudioProfile>('linear-creamy');
  const [volume, setVol] = useState<number>(0.45);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const setVibrationEnabled = (val: boolean) => {
    setVib(val);
    HapticEngine.setVibrationEnabled(val);
    if (val) HapticEngine.trigger('selection');
  };

  const setSoundEnabled = (val: boolean) => {
    setSnd(val);
    HapticEngine.setSoundEnabled(val);
    if (val) HapticEngine.trigger('clack');
  };

  const setAudioProfile = (val: SwitchAudioProfile) => {
    setProf(val);
    HapticEngine.setAudioProfile(val);
    HapticEngine.trigger('clack');
  };

  const setVolume = (val: number) => {
    setVol(val);
    HapticEngine.setVolume(val);
  };

  const trigger = (type: HapticType = 'light') => {
    HapticEngine.trigger(type);
  };

  return (
    <HapticContext.Provider
      value={{
        vibrationEnabled,
        soundEnabled,
        audioProfile,
        volume,
        isSettingsOpen,
        setVibrationEnabled,
        setSoundEnabled,
        setAudioProfile,
        setVolume,
        setIsSettingsOpen,
        trigger,
      }}
    >
      {children}
    </HapticContext.Provider>
  );
};

export const useHaptics = (): HapticContextType => {
  const ctx = useContext(HapticContext);
  if (!ctx) throw new Error('useHaptics must be used within HapticProvider');
  return ctx;
};
