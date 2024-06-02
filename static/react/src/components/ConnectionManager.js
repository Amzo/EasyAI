import React from 'react';

const ConnectionManager = ({ items, connections }) => {
  const renderConnections = () => {
    return connections.map((connection, index) => {
      const fromItem = items.find(item => item.id === connection.fromId);
      const toItem = items.find(item => item.id === connection.toId);

      if (!fromItem || !toItem) return null;

      const fromPos = {
        x: fromItem.left + fromItem.dimensions.width / 2,
        y: fromItem.top + fromItem.dimensions.height / 2
      };

      const toPos = {
        x: toItem.left + toItem.dimensions.width / 2,
        y: toItem.top + toItem.dimensions.height / 2
      };

      return (
        <line
          key={index}
          x1={fromPos.x}
          y1={fromPos.y}
          x2={toPos.x}
          y2={toPos.y}
          stroke="black"
        />
      );
    });
  };

  return (
    <svg className="connections-layer" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      {renderConnections()}
    </svg>
  );
};

export default ConnectionManager;