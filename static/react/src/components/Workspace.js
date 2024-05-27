import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

const Workspace = ({ items, onItemClick }) => {
    return (
        <Droppable droppableId="workspace">
            {(provided) => (
                <div className="workspace" {...provided.droppableProps} ref={provided.innerRef}>
                    {items.map((item, index) => (
                        <div
                            key={item.id}
                            className="workspace-item"
                            onClick={() => onItemClick(item)}
                        >
                            {item.content}
                        </div>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default Workspace;