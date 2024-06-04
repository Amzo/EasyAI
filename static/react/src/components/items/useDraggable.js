import { useState, useCallback } from 'react';

const useDraggable = (ref, zoom, dimensions, item, onMove) => {
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

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

  return { dragging, handleMouseDown, handleMouseMove, handleMouseUp };
};

export default useDraggable;