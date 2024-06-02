import React, { useState } from 'react';
import Toolbox from './components/Toolbox';
import Workspace from './components/Workspace';
import PropertiesPanel from './components/PropertiesPanel';

const App = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [connections, setConnections] = useState([]);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleItemsChange = (newItems) => {
    setItems(newItems);
  };

  const handleConnectionsChange = (newConnections) => {
    setConnections(newConnections);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '20%', borderRight: '1px solid black' }}>
        <Toolbox />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', width: '60%' }}>
        <Workspace
          items={items}
          connections={connections}
          onItemsChange={handleItemsChange}
          onConnectionsChange={handleConnectionsChange}
          onSelectItem={handleSelectItem}
        />
      </div>
      <div style={{ width: '20%', borderLeft: '1px solid black' }}>
        <PropertiesPanel selectedItem={selectedItem} />
      </div>
    </div>
  );
};

export default App;