import React from 'react';

const ConnectionManager = ({ items, connections, zoom }) => {
  const renderConnections = () => {
    return connections.map((connection, index) => {
      const fromItem = items.find(item => item.id === connection.fromId);
      const toItem = items.find(item => item.id === connection.toId);

      if (!fromItem || !toItem || !fromItem.dimensions || !toItem.dimensions) return null;

      const fromCenter = {
        x: (fromItem.left + fromItem.dimensions.width / 2) * zoom,
        y: (fromItem.top + fromItem.dimensions.height / 2) * zoom
      };

      const toCenter = {
        x: (toItem.left + toItem.dimensions.width / 2) * zoom,
        y: (toItem.top + toItem.dimensions.height / 2) * zoom
      };

      let fromPos = { x: fromCenter.x, y: fromCenter.y };
      let toPos = { x: toCenter.x, y: toCenter.y };

      if (toItem.left > fromItem.left + fromItem.dimensions.width) {
        fromPos = { x: (fromItem.left + fromItem.dimensions.width) * zoom, y: (fromItem.top + fromItem.dimensions.height / 2) * zoom };
        toPos = { x: toItem.left * zoom, y: (toItem.top + toItem.dimensions.height / 2) * zoom };
      } else if (toItem.left + toItem.dimensions.width < fromItem.left) {
        fromPos = { x: fromItem.left * zoom, y: (fromItem.top + fromItem.dimensions.height / 2) * zoom };
        toPos = { x: (toItem.left + toItem.dimensions.width) * zoom, y: (toItem.top + toItem.dimensions.height / 2) * zoom };
      } else if (toItem.top > fromItem.top + fromItem.dimensions.height) {
        fromPos = { x: (fromItem.left + fromItem.dimensions.width / 2) * zoom, y: (fromItem.top + fromItem.dimensions.height) * zoom };
        toPos = { x: (toItem.left + toItem.dimensions.width / 2) * zoom, y: toItem.top * zoom };
      } else if (toItem.top + toItem.dimensions.height < fromItem.top) {
        fromPos = { x: (fromItem.left + fromItem.dimensions.width / 2) * zoom, y: fromItem.top * zoom };
        toPos = { x: (toItem.left + toItem.dimensions.width / 2) * zoom, y: (toItem.top + toItem.dimensions.height) * zoom };
      }

      let points;

      if (toItem.left > fromItem.left + fromItem.dimensions.width || toItem.left + toItem.dimensions.width < fromItem.left) {
        points = [
          { x: fromPos.x, y: fromPos.y },
          { x: (fromPos.x + toPos.x) / 2, y: fromPos.y },
          { x: (fromPos.x + toPos.x) / 2, y: toPos.y },
          { x: toPos.x, y: toPos.y }
        ];
      } else {
        points = [
          { x: fromPos.x, y: fromPos.y },
          { x: fromPos.x, y: (fromPos.y + toPos.y) / 2 },
          { x: toPos.x, y: (fromPos.y + toPos.y) / 2 },
          { x: toPos.x, y: toPos.y }
        ];
      }

      const polylinePoints = points.map(point => `${point.x},${point.y}`).join(' ');

      const arrowSize = 10 * zoom;
      const dx = toPos.x - points[points.length - 2].x;
      const dy = toPos.y - points[points.length - 2].y;
      const angle = Math.atan2(dy, dx);
      const arrowHead = [
        { x: toPos.x - arrowSize * Math.cos(angle - Math.PI / 6), y: toPos.y - arrowSize * Math.sin(angle - Math.PI / 6) },
        { x: toPos.x - arrowSize * Math.cos(angle + Math.PI / 6), y: toPos.y - arrowSize * Math.sin(angle + Math.PI / 6) },
        { x: toPos.x, y: toPos.y }
      ];
      const arrowPoints = arrowHead.map(point => `${point.x},${point.y}`).join(' ');

      return (
        <g key={index}>
          <polyline points={polylinePoints} stroke="black" fill="none" />
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