import { useState, useEffect } from 'react';
import { fetchLayers } from '../utils/apiService';

const useFetchLayers = (initialItems) => {
    const [layers, setLayers] = useState(initialItems);

    useEffect(() => {
        const getLayers = async () => {
            try {
                const data = await fetchLayers();
                if (data.length > 0) {
                    setLayers(data);
                }
            } catch (error) {
                console.error("Failed to fetch layers", error);
            }
        };

        getLayers();
    }, []);

    return layers;
};

export default useFetchLayers;