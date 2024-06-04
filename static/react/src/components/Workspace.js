import React, { useState, useRef, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { ItemType } from '../ItemType';
import DraggableItem from './DraggableItem';
import ConnectionManager from './ConnectionManager';
import RibbonBar from './RibbonBar';
import './Workspace.css';

const Workspace = ({ items, connections, onItemsChange, onConnectionsChange, onSelectItem }) => {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [draggingConnection, setDraggingConnection] = useState(null);
  const [zoom, setZoom] = useState(1);
  const workspaceRef = useRef(null);

  useEffect(() => {
    const handleWheel = (event) => {
      if (event.ctrlKey) {
        event.preventDefault();
        if (event.deltaY < 0) {
          handleZoomIn();
        } else {
          handleZoomOut();
        }
      }
    };

    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, []);

    const updateItemDimensions = (id, dimensions) => {
      onItemsChange(items.map((item) =>
        item.id === id ? { ...item, dimensions } : item
      ));
    };

const [, drop] = useDrop({
  accept: ItemType.LAYER,
  drop: (item, monitor) => {
    const offset = monitor.getClientOffset();
    const workspaceRect = workspaceRef.current.getBoundingClientRect();
    const x = (offset.x - workspaceRect.left) / zoom;
    const y = (offset.y - workspaceRect.top) / zoom;
    if (item.id === undefined) {
      onItemsChange([
        ...items,
        { ...item, left: x, top: y, id: items.length, dimensions: { width: 0, height: 0 } }, // Set initial dimensions to 0
      ]);
    } else {
      onItemsChange(items.map((prevItem) =>
        prevItem.id === item.id ? { ...prevItem, left: x, top: y, dimensions: prevItem.dimensions } : prevItem
      ));
    }
  },
});

  const moveItem = (id, left, top) => {
    onItemsChange(items.map((item) =>
      item.id === id ? { ...item, left, top } : item
    ));
  };

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.5));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <RibbonBar
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
      />
      <div
        style={{ display: 'flex', height: '100%' }}
      >
        <div
          className="workspace"
          ref={workspaceRef}
          style={{ overflow: zoom > 1 ? 'auto' : 'hidden', flexGrow: 1 }} // Enable scrollbars when zoomed in
        >
          <div className="workspace-content" style={{ transform: `scale(${zoom})`, transformOrigin: '0 0' }}>

          <div ref={drop} style={{ width: '100%', height: '100%' }}>
            {items.map((item) => (
              <div key={item.id} onClick={() => {
                onSelectItem(item);
                setSelectedItemId(item.id);
              }}>
                <DraggableItem
                  item={item}
                  selected={item.id === selectedItemId}
                  onSelect={onSelectItem}
                  onMove={moveItem}
                  onUpdateDimensions={updateItemDimensions} // Pass the update function
                  zoom={zoom}
                />
              </div>
            ))}
          </div>

            <ConnectionManager
              items={items}
              connections={connections}
              draggingConnection={draggingConnection}
              zoom={zoom} // Pass the zoom level
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;