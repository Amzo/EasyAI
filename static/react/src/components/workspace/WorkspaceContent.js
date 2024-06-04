import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemType } from '../../ItemType';
import DraggableItem from '../items/DraggableItem';
import ConnectionManager from '../ConnectionManager';
import DropZone from './DropZone';

const WorkspaceContent = ({
  items,
  connections,
  zoom,
  selectedItemId,
  setSelectedItemId,
  onSelectItem,
  onItemsChange,
  draggingConnection,
  setDraggingConnection,
  workspaceRef,
}) => {
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
          { ...item, left: x, top: y, id: items.length, dimensions: { width: 0, height: 0 } },
        ]);
      } else {
        onItemsChange(items.map((prevItem) => (prevItem.id === item.id ? { ...prevItem, left: x, top: y, dimensions: prevItem.dimensions } : prevItem)));
      }
    },
  });

  return (
    <div className="workspace-content" style={{ transform: `scale(${zoom})`, transformOrigin: '0 0' }}>
      <DropZone drop={drop}>
        {items.map((item) => (
          <div key={item.id} onClick={() => { onSelectItem(item); setSelectedItemId(item.id); }}>
            <DraggableItem item={item} selected={item.id === selectedItemId} onSelect={onSelectItem} onMove={(id, left, top) => onItemsChange(items.map((item) => (item.id === id ? { ...item, left, top } : item)))} onUpdateDimensions={(id, dimensions) => onItemsChange(items.map((item) => (item.id === id ? { ...item, dimensions } : item)))} zoom={zoom} />
          </div>
        ))}
      </DropZone>
      <ConnectionManager items={items} connections={connections} draggingConnection={draggingConnection} zoom={zoom} />
    </div>
  );
};

export default WorkspaceContent;