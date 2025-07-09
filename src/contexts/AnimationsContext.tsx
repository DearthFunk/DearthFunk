import React, { createContext, useContext, useState } from 'react';
import AnimationsService from '../services/animations';

interface AnimationsContextType {
  animationsService: AnimationsService;
}

const AnimationsContext = createContext<AnimationsContextType | undefined>(undefined);

export const useAnimations = () => {
  const context = useContext(AnimationsContext);
  if (!context) {
    throw new Error('useAnimations must be used within an AnimationsProvider');
  }
  return context;
};

interface AnimationsProviderProps {
  children: React.ReactNode;
}

export const AnimationsProvider: React.FC<AnimationsProviderProps> = ({ children }) => {
  const [animationsService] = useState(() => AnimationsService.getInstance());

  return (
    <AnimationsContext.Provider
      value={{
        animationsService,
      }}
    >
      {children}
    </AnimationsContext.Provider>
  );
};
