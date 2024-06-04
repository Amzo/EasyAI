import React from 'react';

const DropZone = ({ drop, children }) => (
  <div ref={drop} style={{ width: '100%', height: '100%' }}>
    {children}
  </div>
);

export default DropZone;