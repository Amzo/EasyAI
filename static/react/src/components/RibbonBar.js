import React from 'react';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import SaveIcon from '@mui/icons-material/Save';
import UploadIcon from '@mui/icons-material/Upload';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import '../RibbonBar.css';

const RibbonBar = ({ onZoomIn, onZoomOut, onSave, onLoad }) => {
  const handleLoadClick = () => {
    document.getElementById('load-button').click();
  };

  return (
    <div className="ribbon-bar">
      <div className="ribbon-section">
        <button onClick={onZoomIn}><ZoomInIcon /></button>
        <button onClick={onZoomOut}><ZoomOutIcon /></button>
      </div>
      <div className="ribbon-section">
        <button><BorderColorIcon /></button>
        <button><FontDownloadIcon /></button>
        <button><TextFieldsIcon /></button>
      </div>
      <div className="ribbon-section">
        <button onClick={onSave}><SaveIcon /></button>
        <button onClick={handleLoadClick}><UploadIcon /></button>
        <input
          accept=".json"
          style={{ display: 'none' }}
          id="load-button"
          type="file"
          onChange={onLoad}
        />
      </div>
    </div>
  );
};

export default RibbonBar;