import React from 'react';
import type { GrowthStage } from '../types/plant';

interface StageSwitcherProps {
  currentStage: GrowthStage;
  onStageChange: (stage: GrowthStage) => void;
  hasCustomModels?: {
    stage1: boolean;
    stage2: boolean;
    stage3: boolean;
  };
}

export const StageSwitcher: React.FC<StageSwitcherProps> = ({
  currentStage,
  onStageChange,
  hasCustomModels
}) => {
  return (
    <div className="stage-switcher-overlay">
      <div className="stage-label">STAGE</div>
      <div className="stage-buttons">
        {([1, 2, 3] as GrowthStage[]).map((stageNum) => {
          const isSelected = currentStage === stageNum;
          const isCustom = hasCustomModels
            ? stageNum === 1
              ? hasCustomModels.stage1
              : stageNum === 2
              ? hasCustomModels.stage2
              : hasCustomModels.stage3
            : false;

          return (
            <button
              key={stageNum}
              onClick={() => onStageChange(stageNum)}
              className={`stage-num-btn ${isSelected ? 'selected' : ''}`}
              title={isCustom ? `Stage ${stageNum} (Uploaded 3D Model)` : `Stage ${stageNum}`}
            >
              {stageNum}
              {isCustom && <span className="custom-indicator">*</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};
