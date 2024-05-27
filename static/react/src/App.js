import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Sidebar from './components/Sidebar';
import Workspace from './components/Workspace';
import ConfigSidebar from './components/ConfigSidebar';
import InputTypeBox from './components/InputTypeBox';
import './App.css';
import useFetchLayers from './hooks/useFetchLayers';
import { handleDragEnd } from './utils/dragAndDropHelper';
import { handleItemClick, handleDelete } from './utils/itemHandlers';
import { generatePythonCode, downloadPythonFile } from './components/codeGenerator';

const initialItems = [
    { id: '1', content: 'Dense Layer' },
    { id: '2', content: 'Dropout Layer' },
    { id: '3', content: 'Convolutional Layer' },
    { id: '4', content: 'Pooling Layer' },
    { id: '5', content: 'Recurrent Layer' },
    { id: '6', content: 'Batch Normalization Layer' },
    { id: '7', content: 'Flatten Layer' },
    { id: '8', content: 'Embedding Layer' },
    { id: '9', content: 'Activation Layer' },
];

const inputItems = [
    { id: '10', content: 'Audio Input' },
    { id: '11', content: 'Image Input' },
    { id: '12', content: 'Text Input' },
    { id: '13', content: 'Video Input' },
    { id: '14', content: '3D Image Input' },
    { id: '15', content: 'Time Series Input' },
];

function App() {
    const sidebarItems = useFetchLayers(initialItems);
    const [workspaceItems, setWorkspaceItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [inputTypeItems] = useState(inputItems);

    const onDragEnd = (result) => {
        handleDragEnd(result, inputTypeItems, sidebarItems, workspaceItems, setWorkspaceItems);
    };

    const handleExport = () => {
        const pythonCode = generatePythonCode(workspaceItems);
        downloadPythonFile(pythonCode);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="App">
                <header className="App-header">
                    <h1>EasyAI Network Builder</h1>
                </header>
                <div className="container">
                    <div className="sidebar-container">
                        <InputTypeBox items={inputTypeItems} />
                        <Sidebar items={sidebarItems} />
                    </div>
                    <Workspace items={workspaceItems} onItemClick={(item) => handleItemClick(item, setSelectedItem)} />
                    {selectedItem && <ConfigSidebar item={selectedItem} onDelete={(item) => handleDelete(item, workspaceItems, setWorkspaceItems, setSelectedItem)} />}
                </div>
                <button onClick={handleExport}>Export to TensorFlow</button>
            </div>
        </DragDropContext>
    );
}

export default App;