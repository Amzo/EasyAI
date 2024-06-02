import React, { useRef, useEffect, useState, useCallback } from 'react';

const DraggableItem = ({ item, selected, onSelect, onStartConnection, showConnectionPoints, onMove, zoom }) => {
  const ref = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (ref.current) {
      setDimensions({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      });
    }
  }, [item]);

  const handleMouseDown = (e) => {
    const rect = ref.current.getBoundingClientRect();
    setOffset({
      x: (e.clientX - rect.left) / zoom,
      y: (e.clientY - rect.top) / zoom,
    });
    setDragging(true);
    e.stopPropagation();
  };

  const handleMouseMove = useCallback((e) => {
    if (dragging) {
      const workspace = document.querySelector('.workspace').getBoundingClientRect();
      const newX = (e.clientX - offset.x - workspace.left) / zoom;
      const newY = (e.clientY - offset.y - workspace.top) / zoom;

      // Ensure the item stays within the workspace bounds
      const left = Math.max(0, Math.min(newX, workspace.width - dimensions.width));
      const top = Math.max(0, Math.min(newY, workspace.height - dimensions.height));

      onMove(item.id, left, top);
    }
  }, [dragging, offset, dimensions.width, dimensions.height, onMove, item.id, zoom]);

  const handleMouseUp = useCallback(() => {
    setDragging(false);
  }, []);

  useEffect(() => {
    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, handleMouseMove, handleMouseUp]);

  const handleConnectionMouseDown = (position) => (e) => {
    e.stopPropagation();
    onStartConnection(item.id, position, dimensions);
  };

  const style = {
    position: 'absolute',
    left: item.left,
    top: item.top,
    backgroundColor: 'white',
    border: '2px solid black',
    padding: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
    cursor: dragging ? 'grabbing' : 'grab',
    transition: 'background-color 0.2s',
    transform: `scale(${zoom})`,
    transformOrigin: '0 0'
  };

  const pointStyle = {
    position: 'absolute',
    width: '10px',
    height: '10px',
    backgroundColor: 'white',
    border: '1px solid black',
    cursor: 'pointer',
    zIndex: 10,
  };

  return (
    <div
      ref={ref}
      style={style}
      onClick={() => onSelect(item.id)}
      onMouseDown={handleMouseDown}
    >
      <table>
        <tbody>
          <tr>
            <td>Layer {item.id}</td>
          </tr>
          <tr>
            <td><hr /></td>
          </tr>
          <tr>
            <td>{item.name}</td>
          </tr>
        </tbody>
      </table>
      {(selected || showConnectionPoints) && (
        <div>
          <div
            style={{ ...pointStyle, top: '-10px', left: `${dimensions.width / 2 - 5}px`, transform: 'translate(-50%, -50%)' }}
            onMouseDown={handleConnectionMouseDown('top')}
          />
          <div
            style={{ ...pointStyle, top: `${dimensions.height / 2 - 5}px`, right: '-10px', transform: 'translate(50%, -50%)' }}
            onMouseDown={handleConnectionMouseDown('right')}
          />
          <div
            style={{ ...pointStyle, bottom: '-10px', left: `${dimensions.width / 2 - 5}px`, transform: 'translate(-50%, 50%)' }}
            onMouseDown={handleConnectionMouseDown('bottom')}
          />
          <div
            style={{ ...pointStyle, top: `${dimensions.height / 2 - 5}px`, left: '-10px', transform: 'translate(-50%, -50%)' }}
            onMouseDown={handleConnectionMouseDown('left')}
          />
        </div>
      )}
    </div>
  );
};

export default DraggableItem;