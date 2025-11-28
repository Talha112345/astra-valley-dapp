import { useEffect, useRef } from 'react';
import { getPlanetTheme } from '@/lib/planetThemes';

interface CosmicBackgroundProps {
  planet?: string;
}

const CosmicBackground = ({ planet = 'Unknown' }: CosmicBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = getPlanetTheme(planet);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars: Array<{ x: number; y: number; size: number; speed: number; opacity: number; direction: number }> = [];
    const starCount = 200;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random(),
        direction: Math.random() > 0.5 ? 1 : -1,
      });
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 14, 39, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.opacity += star.direction * 0.01;
        if (star.opacity > 1 || star.opacity < 0.1) {
          star.direction *= -1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = theme.background.starColor.replace('0.9', star.opacity.toString());
        ctx.fill();

        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [planet]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 transition-all duration-1000"
      style={{ background: theme.background.gradient }}
    />
  );
};

export default CosmicBackground;
