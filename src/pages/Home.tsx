import React, { useEffect, useState } from 'react';
import { useAnimations } from '../contexts/AnimationsContext';
import { Animation } from '../animations/animation';

const Home: React.FC = () => {
  const { animationsService } = useAnimations();
  const [, forceUpdate] = useState({}); // Force re-render when selectedAnimation changes

useEffect(() => {
  // Initialize canvas when component mounts
  animationsService.onCanvasInserted();
  // Start the animation loop for the default selected animation
  animationsService.selectAnimation(animationsService.selectedAnimation);
}, [animationsService]);

  const handleSelectAnimation = (animation: Animation) => {
    animationsService.selectAnimation(animation);
    forceUpdate({}); // Force re-render to update button states
  };

  const handleToggleControl = (index: number) => {
    animationsService.toggleControl(index);
    forceUpdate({}); // Force re-render to update control states
  };

  return (
    <div className="page">
      <ul className="animations">
        {animationsService.animations.map((animation, index) => (
          <li key={index}>
            <button
              onClick={() => handleSelectAnimation(animation)}
              className={animation === animationsService.selectedAnimation ? 'selected' : ''}
              type="button">
              {animation.label}
            </button>
          </li>
        ))}
      </ul>
      
      {/* Controls for AnimationSquare (index 1) */}
      {animationsService.selectedAnimation === animationsService.animations[2] && animationsService.controls && (
        <ul className="controls">
          {animationsService.controls.map((control, index) => (
            <li key={index}>
              <button
                onClick={() => handleToggleControl(index)}
                className={control.value ? 'selected' : ''}
                type="button">
                {control.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
