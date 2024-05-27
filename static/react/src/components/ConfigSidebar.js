import React, { useState } from 'react';

const ConfigSidebar = ({ item, onDelete }) => {
    const [neurons, setNeurons] = useState(20); // Default value
    const [activation, setActivation] = useState('relu'); // Default value
    const [dropoutRate, setDropoutRate] = useState(0.5);
    const [kernelSize, setKernelSize] = useState(3);
    const [poolSize, setPoolSize] = useState(2);
    const [units, setUnits] = useState(50);
    const [embeddingDim, setEmbeddingDim] = useState(128);

    const handleNeuronsChange = (e) => {
        setNeurons(e.target.value);
    };

    const handleActivationChange = (e) => {
        setActivation(e.target.value);
    };

    const handleDropoutRateChange = (e) => {
        setDropoutRate(e.target.value);
    };

    const handleKernelSizeChange = (e) => {
        setKernelSize(e.target.value);
    };

    const handlePoolSizeChange = (e) => {
        setPoolSize(e.target.value);
    };

    const handleUnitsChange = (e) => {
        setUnits(e.target.value);
    };

    const handleEmbeddingDimChange = (e) => {
        setEmbeddingDim(e.target.value);
    };

    return (
        <div className="config-sidebar">
            <h2>Configure {item.content}</h2>
            {item.content === 'Dense Layer' && (
                <>
                    <div className="config-item">
                        <label>Neurons:</label>
                        <input type="number" value={neurons} onChange={handleNeuronsChange} />
                    </div>
                    <div className="config-item">
                        <label>Activation Function:</label>
                        <select value={activation} onChange={handleActivationChange}>
                            <option value="relu">ReLU</option>
                            <option value="sigmoid">Sigmoid</option>
                            <option value="tanh">Tanh</option>
                            <option value="softmax">Softmax</option>
                        </select>
                    </div>
                </>
            )}
            {item.content === 'Dropout Layer' && (
                <div className="config-item">
                    <label>Dropout Rate:</label>
                    <input type="number" step="0.1" value={dropoutRate} onChange={handleDropoutRateChange} />
                </div>
            )}
            {item.content === 'Convolutional Layer' && (
                <div className="config-item">
                    <label>Kernel Size:</label>
                    <input type="number" value={kernelSize} onChange={handleKernelSizeChange} />
                </div>
            )}
            {item.content === 'Pooling Layer' && (
                <div className="config-item">
                    <label>Pool Size:</label>
                    <input type="number" value={poolSize} onChange={handlePoolSizeChange} />
                </div>
            )}
            {item.content === 'Recurrent Layer' && (
                <div className="config-item">
                    <label>Units:</label>
                    <input type="number" value={units} onChange={handleUnitsChange} />
                </div>
            )}
            {item.content === 'Embedding Layer' && (
                <div className="config-item">
                    <label>Embedding Dimension:</label>
                    <input type="number" value={embeddingDim} onChange={handleEmbeddingDimChange} />
                </div>
            )}
            <button onClick={() => onDelete(item)}>Delete</button>
        </div>
    );
};

export default ConfigSidebar;