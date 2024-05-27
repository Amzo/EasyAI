import axios from 'axios';

export const fetchLayers = async () => {
    try {
        const response = await axios.get('/api/layers/');
        return response.data;
    } catch (error) {
        console.error("There was an error fetching the layers!", error);
        throw error;
    }
};