import React, { useState, useEffect } from 'react';
import Toolbox from './components/Toolbox';
import Workspace from './components/workspace/Workspace';
import PropertiesPanel from './components/PropertiesPanel';
import { saveAs } from 'file-saver';

const App = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Delete' && selectedItem) {
        handleDeleteItem(selectedItem.id);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedItem]);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleItemsChange = (newItems) => {
    setItems(newItems);
  };

  const handleConnectionsChange = (newConnections) => {
    setConnections(newConnections);
  };

  const handleDeleteItem = (id) => {
    const newItems = items.filter(item => item.id !== id);
    const newConnections = connections.filter(connection => connection.fromId !== id && connection.toId !== id);
    setItems(newItems);
    setConnections(newConnections);
    setSelectedItem(null);
  };

  const handleSave = () => {
    const workspaceState = { items, connections };
    const blob = new Blob([JSON.stringify(workspaceState, null, 2)], { type: 'application/json' });
    saveAs(blob, 'workspace.json');
  };

  const handleLoad = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const workspaceState = JSON.parse(e.target.result);
        setItems(workspaceState.items);
        setConnections(workspaceState.connections);
        console.log('Loaded items:', workspaceState.items);  // Debug log
        console.log('Loaded connections:', workspaceState.connections);  // Debug log
      };
      reader.readAsText(file);
    }
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
          onSave={handleSave}
          onLoad={handleLoad}
        />
      </div>
      <div style={{ width: '20%', borderLeft: '1px solid black' }}>
        <PropertiesPanel
          selectedItem={selectedItem}
          items={items}
          connections={connections}
          onConnectionsChange={handleConnectionsChange}
          onDeleteItem={handleDeleteItem}
        />
      </div>
    </div>
  );
};

export default App;