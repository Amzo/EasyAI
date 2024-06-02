import React from 'react';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import '../RibbonBar.css'; // Import the CSS file for RibbonBar

const RibbonBar = ({ onZoomIn, onZoomOut }) => {
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
    </div>
  );
};

export default RibbonBar;