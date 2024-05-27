export const handleItemClick = (item, setSelectedItem) => {
    setSelectedItem(item);
};

export const handleDelete = (item, workspaceItems, setWorkspaceItems, setSelectedItem) => {
    setWorkspaceItems(workspaceItems.filter(workspaceItem => workspaceItem.id !== item.id));
    setSelectedItem(null);
};