import React, { useRef, useEffect, useState, useCallback } from 'react';
import useDraggable from './useDraggable';
import useDimensions from './useDimensions';

const DraggableItem = ({ item, selected, onSelect, onMove, onUpdateDimensions, zoom }) => {
  const ref = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const { dragging, handleMouseDown, handleMouseMove, handleMouseUp } = useDraggable(ref, zoom, dimensions, item, onMove);
  const { updateDimensions } = useDimensions(ref, item, onUpdateDimensions, zoom, setDimensions);

  useEffect(() => {
    updateDimensions();
  }, [item, onUpdateDimensions, zoom, updateDimensions]);

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