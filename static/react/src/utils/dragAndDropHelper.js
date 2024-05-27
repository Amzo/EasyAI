export const handleDragEnd = (result, inputTypeItems, sidebarItems, workspaceItems, setWorkspaceItems) => {
    const { source, destination } = result;

    if (!destination) return;

    let items;
    if (source.droppableId === 'inputBox' && destination.droppableId === 'workspace') {
        items = inputTypeItems;
    } else if (source.droppableId === 'sidebar' && destination.droppableId === 'workspace') {
        items = sidebarItems;
    } else {
        return;
    }

    const item = items[source.index];
    setWorkspaceItems([...workspaceItems, item]);
};