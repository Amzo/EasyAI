import React from 'react';

const PropertiesPanel = ({ selectedItem }) => {
  if (!selectedItem) return <div>Select an item to see its properties.</div>;

  return (
    <div>
      <h3>Properties for {selectedItem.name}</h3>
      {/* Add form elements for the properties here */}
    </div>
  );
};

export default PropertiesPanel;