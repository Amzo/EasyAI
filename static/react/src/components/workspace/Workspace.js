import React, { useState, useRef, useEffect } from 'react';
import RibbonBar from '../RibbonBar';
import WorkspaceContent from './WorkspaceContent';
import ZoomControls from './ZoomControls';
import './Workspace.css';

const Workspace = ({ items, connections, onItemsChange, onConnectionsChange, onSelectItem, onSave, onLoad }) => {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [draggingConnection, setDraggingConnection] = useState(null);
  const [zoom, setZoom] = useState(1);
  const workspaceRef = useRef(null);

  useEffect(() => {
    const handleWheel = (event) => {
      if (event.ctrlKey) {
        event.preventDefault();
        if (event.deltaY < 0) {
          setZoom((prevZoom) => Math.min(prevZoom + 0.1, 2));
        } else {
          setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.5));
        }
      }
    };

    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <RibbonBar onZoomIn={() => setZoom((prevZoom) => Math.min(prevZoom + 0.1, 2))} onZoomOut={() => setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.5))} onSave={onSave} onLoad={onLoad} />
      <div style={{ display: 'flex', height: '100%' }}>
        <div className="workspace" ref={workspaceRef} style={{ overflow: zoom > 1 ? 'auto' : 'hidden', flexGrow: 1 }}>
          <WorkspaceContent
            items={items}
            connections={connections}
            zoom={zoom}
            selectedItemId={selectedItemId}
            setSelectedItemId={setSelectedItemId}
            onSelectItem={onSelectItem}
            onItemsChange={onItemsChange}
            draggingConnection={draggingConnection}
            setDraggingConnection={setDraggingConnection}
            workspaceRef={workspaceRef}
          />
        </div>
      </div>
    </div>
  );
};

export default Workspace;