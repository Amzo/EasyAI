import React from 'react';
import { Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';

const PropertiesPanel = ({ selectedItem, items, connections, onConnectionsChange, onDeleteItem }) => {
  if (!selectedItem) return <div>Select an item to see its properties.</div>;

  const handleConnectToChange = (event) => {
    const newConnection = { fromId: selectedItem.id, toId: event.target.value };
    onConnectionsChange([...connections.filter(conn => conn.fromId !== selectedItem.id), newConnection]);
  };

  const handleDelete = () => {
    onDeleteItem(selectedItem.id);
  };

  return (
    <div>
      <h3>Properties for {selectedItem.name}</h3>
      <FormControl fullWidth>
        <InputLabel>Connects To</InputLabel>
        <Select
          value={connections.find(conn => conn.fromId === selectedItem.id)?.toId || ''}
          onChange={handleConnectToChange}
        >
          {items.filter(item => item.id !== selectedItem.id).map(item => (
            <MenuItem key={item.id} value={item.id}>
              {item.name} (Layer {item.id})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="secondary" onClick={handleDelete} style={{ marginTop: '20px' }}>
        Delete Layer
      </Button>
    </div>
  );
};

export default PropertiesPanel;