import React from 'react';

const ZoomControls = ({ onZoomIn, onZoomOut }) => (
  <div>
    <button onClick={onZoomIn}>Zoom In</button>
    <button onClick={onZoomOut}>Zoom Out</button>
  </div>
);

export default ZoomControls;