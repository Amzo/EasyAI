import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const Sidebar = ({ items }) => {
    return (
        <Droppable droppableId="sidebar">
            {(provided) => (
                <div className="sidebar" {...provided.droppableProps} ref={provided.innerRef}>
                    {items.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="sidebar-item"
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

export default Sidebar;