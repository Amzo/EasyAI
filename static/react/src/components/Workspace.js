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
          { ...item, left: x, top: y, id: items.length, dimensions: { width: 100, height: 50 } }, // Example dimensions
        ]);
      } else {
        onItemsChange(items.map((prevItem) =>
          prevItem.id === item.id ? { ...prevItem, left: x, top: y, dimensions: prevItem.dimensions || { width: 100, height: 50 } } : prevItem
        ));
      }
    },
  });

  const moveItem = (id, left, top) => {
    onItemsChange(items.map((item) =>
      item.id === id ? { ...item, left, top } : item
    ));
  };

  const handleStartConnection = (id, position, dimensions) => {
    setDraggingConnection({ fromId: id, fromPosition: position, fromDimensions: dimensions, to: null });
  };

  const handleMouseMove = (e) => {
    if (draggingConnection) {
      const workspaceRect = workspaceRef.current.getBoundingClientRect();
      const offset = {
        x: (e.clientX - workspaceRect.left) / zoom,
        y: (e.clientY - workspaceRect.top) / zoom,
      };
      setDraggingConnection((prevConnection) => ({
        ...prevConnection,
        to: offset,
      }));
    }
  };

  const handleMouseUp = (e) => {
    if (draggingConnection) {
      const workspaceRect = workspaceRef.current.getBoundingClientRect();
      const x = (e.clientX - workspaceRect.left) / zoom;
      const y = (e.clientY - workspaceRect.top) / zoom;

      const targetItem = items.find(
        (item) =>
          x > item.left &&
          x < item.left + (item.dimensions ? item.dimensions.width : 0) &&
          y > item.top &&
          y < item.top + (item.dimensions ? item.dimensions.height : 0)
      );

      if (targetItem && targetItem.id !== draggingConnection.fromId) {
        const targetPosition = getTargetPosition(targetItem, x, y);
        if (targetPosition) {
          const newConnection = { fromId: draggingConnection.fromId, toId: targetItem.id };
          if (isValidConnection(newConnection)) {
            onConnectionsChange([...connections, newConnection]);
          }
        }
      }

      setDraggingConnection(null);
      setSelectedItemId(null); // Hide connection points after dragging
    }
  };

  const getTargetPosition = (item, x, y) => {
    const dimensions = item.dimensions || { width: 0, height: 0 };
    const top = { x: item.left + dimensions.width / 2, y: item.top - 15 };
    const right = { x: item.left + dimensions.width + 15, y: item.top + dimensions.height / 2 };
    const bottom = { x: item.left + dimensions.width / 2, y: item.top + dimensions.height + 15 };
    const left = { x: item.left - 15, y: item.top + dimensions.height / 2 };

    const distances = [
      { position: 'top', distance: getDistance(top, x, y) },
      { position: 'right', distance: getDistance(right, x, y) },
      { position: 'bottom', distance: getDistance(bottom, x, y) },
      { position: 'left', distance: getDistance(left, x, y) },
    ];

    distances.sort((a, b) => a.distance - b.distance);
    return distances[0].position;
  };

  const getDistance = (point, x, y) => {
    return Math.sqrt((point.x - x) ** 2 + (point.y - y) ** 2);
  };

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.5));
  };

  const isValidConnection = (newConnection) => {
    // Prevent multiple connections to the same node
    if (connections.find(connection => connection.toId === newConnection.toId)) {
      return false;
    }
    // Add more validation logic here as needed
    return true;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <RibbonBar
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
      />
      <div
        style={{ display: 'flex', height: '100%' }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
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
                    onStartConnection={handleStartConnection}
                    showConnectionPoints={!!draggingConnection || item.id === selectedItemId}
                    onMove={moveItem} // Pass moveItem function
                    zoom={zoom} // Pass the zoom level
                  />
                </div>
              ))}
            </div>
            <ConnectionManager
              items={items}
              connections={connections}
              draggingConnection={draggingConnection}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;