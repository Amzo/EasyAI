import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemType } from '../ItemType';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import VideocamIcon from '@mui/icons-material/Videocam';
import LayersIcon from '@mui/icons-material/Layers';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import ClearAllIcon from '@mui/icons-material/ClearAll';

const ToolboxItem = ({ name, type, icon }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.LAYER,
    item: { name, type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <ListItem button ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }} className="toolbox-item">
      <ListItemIcon className="toolbox-icon">{icon}</ListItemIcon>
      <ListItemText primary={name} className="toolbox-text" />
    </ListItem>
  );
};

const Toolbox = () => {
  return (
    <div id="toolbox">
      <h3 className="toolbox-title">Toolbox</h3>
      <Divider />
      <List component="nav">
        <ListItem>
          <ListItemText primary="Inputs" className="toolbox-category" />
        </ListItem>
        <ToolboxItem name="Audio Input" type="audio" icon={<AudiotrackIcon />} />
        <ToolboxItem name="Video Input" type="video" icon={<VideocamIcon />} />
      </List>
      <Divider />
      <List component="nav">
        <ListItem>
          <ListItemText primary="Layers" className="toolbox-category" />
        </ListItem>
        <ToolboxItem name="Dense" type="dense" icon={<LayersIcon />} />
        <ToolboxItem name="CNN" type="cnn" icon={<BlurOnIcon />} />
        <ToolboxItem name="RNN" type="rnn" icon={<MergeTypeIcon />} />
        <ToolboxItem name="Dropout" type="dropout" icon={<ClearAllIcon />} />
        <ToolboxItem name="Concatenate" type="concatenate" icon={<CallSplitIcon />} />
      </List>
    </div>
  );
};

export default Toolbox;