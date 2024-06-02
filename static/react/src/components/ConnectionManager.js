import React from 'react';

const ConnectionManager = ({ items, connections }) => {
  const renderConnections = () => {
    return connections.map((connection, index) => {
      const fromItem = items.find(item => item.id === connection.fromId);
      const toItem = items.find(item => item.id === connection.toId);

      if (!fromItem || !toItem || !fromItem.dimensions || !toItem.dimensions) return null;

      const fromCenter = {
        x: fromItem.left + fromItem.dimensions.width / 2,
        y: fromItem.top + fromItem.dimensions.height / 2
      };

      const toCenter = {
        x: toItem.left + toItem.dimensions.width / 2,
        y: toItem.top + toItem.dimensions.height / 2
      };

      let fromPos = { x: fromCenter.x, y: fromCenter.y };
      let toPos = { x: toCenter.x, y: toCenter.y };

      const midX = (fromPos.x + toPos.x) / 2;
      const midY = (fromPos.y + toPos.y) / 2;

      if (fromCenter.x < toCenter.x && Math.abs(fromCenter.y - toCenter.y) <= fromItem.dimensions.height) {
        fromPos = { x: fromItem.left + fromItem.dimensions.width + 5, y: fromCenter.y };
        toPos = { x: toItem.left - 5, y: toCenter.y };
      } else if (fromCenter.x > toCenter.x && Math.abs(fromCenter.y - toCenter.y) <= fromItem.dimensions.height) {
        fromPos = { x: fromItem.left - 5, y: fromCenter.y };
        toPos = { x: toItem.left + toItem.dimensions.width + 5, y: toCenter.y };
      } else if (fromCenter.y < toCenter.y) {
        fromPos = { x: fromCenter.x, y: fromItem.top + fromItem.dimensions.height + 5 };
        toPos = { x: toCenter.x, y: toItem.top - 5 };
      } else if (fromCenter.y > toCenter.y) {
        fromPos = { x: fromCenter.x, y: fromItem.top - 5 };
        toPos = { x: toCenter.x, y: toItem.top + toItem.dimensions.height + 5 };
      }

      const arrowPoints = (() => {
        if (fromPos.x === fromCenter.x && toPos.x === toCenter.x) {
          return toPos.y < fromPos.y ? `${midX - 5},${midY + 5} ${midX + 5},${midY + 5} ${midX},${midY - 5}` : `${midX - 5},${midY - 5} ${midX + 5},${midY - 5} ${midX},${midY + 5}`;
        } else if (fromPos.y === fromCenter.y && toPos.y === toCenter.y) {
          return toPos.x < fromPos.x ? `${midX + 5},${midY - 5} ${midX + 5},${midY + 5} ${midX - 5},${midY}` : `${midX - 5},${midY - 5} ${midX - 5},${midY + 5} ${midX + 5},${midY}`;
        }
      })();

      return (
        <g key={index}>
          <polyline points={`${fromPos.x},${fromPos.y} ${midX},${fromPos.y} ${midX},${toPos.y} ${toPos.x},${toPos.y}`} stroke="black" fill="none" />
          <polygon points={arrowPoints} fill="black" />
        </g>
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