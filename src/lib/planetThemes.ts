export interface PlanetTheme {
  name: string;
  background: {
    gradient: string;
    starColor: string;
    nebulaColor: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    glow: string;
  };
  effects: {
    particleColor: string;
    glowIntensity: number;
  };
}

export const planetThemes: Record<string, PlanetTheme> = {
  Nova: {
    name: 'Nova',
    background: {
      gradient: 'radial-gradient(ellipse at bottom, #ff1744 0%, #1a0e1f 100%)',
      starColor: 'rgba(255, 100, 150, 0.9)',
      nebulaColor: 'rgba(255, 23, 68, 0.3)',
    },
    colors: {
      primary: '330 100% 65%', // Pink
      secondary: '350 100% 70%',
      accent: '0 100% 75%',
      glow: 'rgba(255, 23, 68, 0.5)',
    },
    effects: {
      particleColor: '#ff1744',
      glowIntensity: 1.2,
    },
  },
  Orion: {
    name: 'Orion',
    background: {
      gradient: 'radial-gradient(ellipse at bottom, #2196f3 0%, #0a1929 100%)',
      starColor: 'rgba(100, 200, 255, 0.9)',
      nebulaColor: 'rgba(33, 150, 243, 0.3)',
    },
    colors: {
      primary: '210 100% 65%', // Blue
      secondary: '200 100% 70%',
      accent: '190 100% 75%',
      glow: 'rgba(33, 150, 243, 0.5)',
    },
    effects: {
      particleColor: '#2196f3',
      glowIntensity: 1.0,
    },
  },
  Vega: {
    name: 'Vega',
    background: {
      gradient: 'radial-gradient(ellipse at bottom, #9c27b0 0%, #1a0a29 100%)',
      starColor: 'rgba(200, 100, 255, 0.9)',
      nebulaColor: 'rgba(156, 39, 176, 0.3)',
    },
    colors: {
      primary: '280 100% 70%', // Purple
      secondary: '270 100% 65%',
      accent: '290 100% 75%',
      glow: 'rgba(156, 39, 176, 0.5)',
    },
    effects: {
      particleColor: '#9c27b0',
      glowIntensity: 1.3,
    },
  },
  Lyra: {
    name: 'Lyra',
    background: {
      gradient: 'radial-gradient(ellipse at bottom, #00e676 0%, #0a291a 100%)',
      starColor: 'rgba(100, 255, 150, 0.9)',
      nebulaColor: 'rgba(0, 230, 118, 0.3)',
    },
    colors: {
      primary: '145 100% 60%', // Green
      secondary: '140 100% 65%',
      accent: '160 100% 70%',
      glow: 'rgba(0, 230, 118, 0.5)',
    },
    effects: {
      particleColor: '#00e676',
      glowIntensity: 1.1,
    },
  },
  Solis: {
    name: 'Solis',
    background: {
      gradient: 'radial-gradient(ellipse at bottom, #ffc107 0%, #291a0a 100%)',
      starColor: 'rgba(255, 220, 100, 0.9)',
      nebulaColor: 'rgba(255, 193, 7, 0.3)',
    },
    colors: {
      primary: '45 100% 60%', // Gold/Yellow
      secondary: '40 100% 65%',
      accent: '50 100% 70%',
      glow: 'rgba(255, 193, 7, 0.5)',
    },
    effects: {
      particleColor: '#ffc107',
      glowIntensity: 1.4,
    },
  },
  Unknown: {
    name: 'Unknown',
    background: {
      gradient: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)',
      starColor: 'rgba(255, 255, 255, 0.9)',
      nebulaColor: 'rgba(100, 100, 200, 0.2)',
    },
    colors: {
      primary: '330 100% 65%',
      secondary: '220 100% 65%',
      accent: '270 100% 70%',
      glow: 'rgba(100, 100, 200, 0.3)',
    },
    effects: {
      particleColor: '#6366f1',
      glowIntensity: 1.0,
    },
  },
};

export const getPlanetTheme = (planet: string): PlanetTheme => {
  return planetThemes[planet] || planetThemes.Unknown;
};
