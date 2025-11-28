import { useEffect } from 'react';
import { getPlanetTheme } from '@/lib/planetThemes';

export const usePlanetTheme = (planet: string) => {
  useEffect(() => {
    const theme = getPlanetTheme(planet);
    const root = document.documentElement;

    // Apply theme CSS variables
    root.style.setProperty('--primary', theme.colors.primary);
    root.style.setProperty('--secondary', theme.colors.secondary);
    root.style.setProperty('--accent', theme.colors.accent);
    root.style.setProperty('--glow-color', theme.colors.glow);
    
    // Update shadow and glow effects
    root.style.setProperty('--shadow-glow-pink', `0 0 30px ${theme.colors.glow}`);
    root.style.setProperty('--shadow-cosmic', `0 0 40px ${theme.colors.glow}, 0 0 80px ${theme.colors.glow}`);
    
  }, [planet]);
};
