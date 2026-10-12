import React, { useState } from 'react';
import type { Plant, GrowthStage } from '../types/plant';
import { StorageService } from '../services/storage';

interface ModelManagementModalProps {
  plant: Plant;
  onClose: () => void;
  onPlantUpdated: (updatedPlant: Plant) => void;
}

export const ModelManagementModal: React.FC<ModelManagementModalProps> = ({
  plant,
  onClose,
  onPlantUpdated
}) => {
  const [stage1Url, setStage1Url] = useState(plant.stage1_model || '');
  const [stage2Url, setStage2Url] = useState(plant.stage2_model || '');
  const [stage3Url, setStage3Url] = useState(plant.stage3_model || '');

  const [stage1Name, setStage1Name] = useState(plant.stage1_model ? 'Uploaded GLB Model' : 'Procedural Model');
  const [stage2Name, setStage2Name] = useState(plant.stage2_model ? 'Uploaded GLB Model' : 'Procedural Model');
  const [stage3Name, setStage3Name] = useState(plant.stage3_model ? 'Uploaded GLB Model' : 'Procedural Model');

  const handleFileUpload = (stage: GrowthStage, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const objectUrl = URL.createObjectURL(file);

      if (stage === 1) {
        setStage1Url(objectUrl);
        setStage1Name(file.name);
      } else if (stage === 2) {
        setStage2Url(objectUrl);
        setStage2Name(file.name);
      } else if (stage === 3) {
        setStage3Url(objectUrl);
        setStage3Name(file.name);
      }
    }
  };

  const handleClearModel = (stage: GrowthStage) => {
    if (stage === 1) {
      setStage1Url('');
      setStage1Name('Procedural Model');
    } else if (stage === 2) {
      setStage2Url('');
      setStage2Name('Procedural Model');
    } else if (stage === 3) {
      setStage3Url('');
      setStage3Name('Procedural Model');
    }
  };

  const handleSave = () => {
    const updated: Plant = {
      ...plant,
      stage1_model: stage1Url,
      stage2_model: stage2Url,
      stage3_model: stage3Url
    };

    StorageService.updatePlant(updated);
    onPlantUpdated(updated);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">3D MODEL MANAGEMENT — {plant.name}</div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="model-management-intro">
            Manually upload 3D plant models (.glb / .gltf) for each growth stage.
          </div>

          <div className="stage-upload-list">
            {/* Stage 1 */}
            <div className="stage-upload-row">
              <div className="stage-info">
                <span className="field-label">STAGE 1 (YOUNG PLANT)</span>
                <span className="file-status">{stage1Name}</span>
              </div>
              <div className="upload-controls">
                <label className="upload-btn">
                  UPLOAD GLB
                  <input
                    type="file"
                    accept=".glb,.gltf"
                    onChange={(e) => handleFileUpload(1, e)}
                  />
                </label>
                {stage1Url && (
                  <button className="clear-btn" onClick={() => handleClearModel(1)}>
                    RESET
                  </button>
                )}
              </div>
            </div>

            {/* Stage 2 */}
            <div className="stage-upload-row">
              <div className="stage-info">
                <span className="field-label">STAGE 2 (GROWING PLANT)</span>
                <span className="file-status">{stage2Name}</span>
              </div>
              <div className="upload-controls">
                <label className="upload-btn">
                  UPLOAD GLB
                  <input
                    type="file"
                    accept=".glb,.gltf"
                    onChange={(e) => handleFileUpload(2, e)}
                  />
                </label>
                {stage2Url && (
                  <button className="clear-btn" onClick={() => handleClearModel(2)}>
                    RESET
                  </button>
                )}
              </div>
            </div>

            {/* Stage 3 */}
            <div className="stage-upload-row">
              <div className="stage-info">
                <span className="field-label">STAGE 3 (MATURE PLANT)</span>
                <span className="file-status">{stage3Name}</span>
              </div>
              <div className="upload-controls">
                <label className="upload-btn">
                  UPLOAD GLB
                  <input
                    type="file"
                    accept=".glb,.gltf"
                    onChange={(e) => handleFileUpload(3, e)}
                  />
                </label>
                {stage3Url && (
                  <button className="clear-btn" onClick={() => handleClearModel(3)}>
                    RESET
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="modal-actions-bottom">
            <button className="minimal-btn save" onClick={handleSave}>
              SAVE MODEL CONFIGURATION
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
