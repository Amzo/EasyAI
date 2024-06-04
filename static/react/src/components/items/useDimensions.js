import { useCallback } from 'react';

const useDimensions = (ref, item, onUpdateDimensions, zoom, setDimensions) => {
  const updateDimensions = useCallback(() => {
    if (ref.current) {
      const newDimensions = {
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      };
      setDimensions(newDimensions);
      if (item.dimensions.width !== newDimensions.width || item.dimensions.height !== newDimensions.height) {
        onUpdateDimensions(item.id, newDimensions);
      }
    }
  }, [item, onUpdateDimensions, zoom, setDimensions]);

  return { updateDimensions };
};

export default useDimensions;