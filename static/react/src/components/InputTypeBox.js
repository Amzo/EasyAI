// components/InputTypeBox.js
import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const InputTypeBox = ({ items }) => {
    return (
        <Droppable droppableId="inputBox">
            {(provided) => (
                <div className="input-box" {...provided.droppableProps} ref={provided.innerRef}>
                    <h3>Input Types</h3>
                    {items.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="input-item"
                                >
                                    {item.content}
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default InputTypeBox;