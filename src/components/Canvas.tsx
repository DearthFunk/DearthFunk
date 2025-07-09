import { useEffect, useRef } from "react";
import { useAnimations } from "../contexts/AnimationsContext";

interface CanvasProps {
}

const Canvas: React.FC<CanvasProps> = () => {
  const { animationsService } = useAnimations();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const updateCanvasSize = () => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }
  };

  useEffect(() => {
    // Set initial canvas size
    updateCanvasSize();
    
    // Setup canvas in animations service
    animationsService.onCanvasInserted();
    
    // Add resize event listener
    window.addEventListener('resize', updateCanvasSize);
    
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [animationsService]);

  return (
    <canvas 
      ref={canvasRef}
      id="animation-canvas"
    ></canvas>
  )
}

export default Canvas;