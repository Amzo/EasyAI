import React, { useRef, useEffect, useState, useCallback } from 'react';

const DraggableItem = ({ item, selected, onSelect, onMove, onUpdateDimensions, zoom }) => {
  const ref = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (ref.current) {
      const newDimensions = {
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      };
      setDimensions(newDimensions);
      if (item.dimensions.width !== newDimensions.width || item.dimensions.height !== newDimensions.height) {
        onUpdateDimensions(item.id, newDimensions);
      }
    }
  }, [item, onUpdateDimensions, zoom]);

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
      const newX = (e.clientX - offset.x * zoom - workspace.left) / zoom;
      const newY = (e.clientY - offset.y * zoom - workspace.top) / zoom;

      const left = Math.max(0, Math.min(newX, workspace.width / zoom - dimensions.width));
      const top = Math.max(0, Math.min(newY, workspace.height / zoom - dimensions.height));
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

  const style = {
    position: 'absolute',
    left: item.left * zoom,
    top: item.top * zoom,
    backgroundColor: 'white',
    border: '2px solid black',
    padding: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
    cursor: dragging ? 'grabbing' : 'grab',
    transition: 'background-color 0.2s',
    transform: `scale(${zoom})`,
    transformOrigin: '0 0'
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
    </div>
  );
};

export default DraggableItem;