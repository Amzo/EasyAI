import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';

const DragAndDrop = () => {
    const [layers, setLayers] = useState([]);

    useEffect(() => {
        axios.get('/api/layers/')
            .then(response => {
                console.log(response.data);
                setLayers(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the layers!", error);
            });
    }, []);

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(layers);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setLayers(items);
    };

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="layers">
                {(provided) => (
                    <ul className="layers" {...provided.droppableProps} ref={provided.innerRef}>
                        {layers.map(({ id, name, layer_type }, index) => (
                            <Draggable key={id} draggableId={String(id)} index={index}>
                                {(provided) => (
                                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <h3>{name}</h3>
                                        <p>{layer_type}</p>
                                    </li>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default DragAndDrop;