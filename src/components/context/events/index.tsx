// React imports
import { useState, useCallback, useContext, createContext } from 'react';

// App imports
import { useGeo } from '../filters/geo';

const EventsContext: React.Context<any> = createContext(null);

export const useEvents = () => {
	return (
		useContext(EventsContext)
	)
}

export const EventsProvider = ({children}: any) => {
		const { mapRef, marker, setMarker } = useGeo();
		
		const [ isDragging, setIsDragging ] = useState(false);
		const [ dragOffset, setDragOffset ] = useState({ x: 0, y: 0 });

		const isClickInsideCircle = useCallback(
	        (point: { x: number, y: number }) => {
	            const features = mapRef.current?.queryRenderedFeatures(point, {
	                layers: ['layer-mask']
	            });
	            return features && features.length > 0;
	        },
	        [mapRef]
	    );

	    const onDragStart = useCallback(
	        (event: any) => {
	            if (isClickInsideCircle(event.point)) {
	                setIsDragging(true);
	                const { x, y } = event.point;
	                const projected = mapRef.current.project([marker.longitude, marker.latitude]);
	                setDragOffset({ x: x - projected.x, y: y - projected.y });
	            }
	        },
	        [ isClickInsideCircle, marker, mapRef ]
	    );

	    const onMouseMove = useCallback(
	        (event: any) => {
	            if (isDragging) {
	                const newCenter = mapRef.current.unproject({
	                    x: event.point.x - dragOffset.x,
	                    y: event.point.y - dragOffset.y
	                });
	                setMarker({
	                    longitude: newCenter.lng,
	                    latitude: newCenter.lat
	                });
	            }
	        },
	        [ isDragging, dragOffset, mapRef, setMarker ]
	    );

	    const onDragEnd = useCallback(() => {
	        setIsDragging(false);
	    }, []);

	return (
		<EventsContext.Provider value={{
			isDragging,
			onDragStart,
			onMouseMove,
			onDragEnd,
		}}>
			{children}
		</EventsContext.Provider>
	)
}

EventsContext.displayName = "EventsContext";