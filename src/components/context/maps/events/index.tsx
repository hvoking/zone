// React imports
import { useState, useCallback, useContext, createContext } from 'react';

// App imports
import { useGeo } from '../../filters/geo';
import { useEnvelopApi } from '../../api/envelop';

const EventsContext: React.Context<any> = createContext(null);

export const useEvents = () => {
	return (
		useContext(EventsContext)
	)
}

export const EventsProvider = ({children}: any) => {
		const { mapRef, marker, setMarker, setBaseGeometry } = useGeo();
		
		const [ isDragging, setIsDragging ] = useState(false);
		const [ dragOffset, setDragOffset ] = useState({ x: 0, y: 0 });

		const { setEnvelopData } = useEnvelopApi();

		const isClickInsideCircle = useCallback((point: { x: number, y: number }) => {
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

   		const onClick = useCallback((event: any) => {
            const features = mapRef.current?.queryRenderedFeatures(event.point, {
                layers: ["fill Single symbol"]
            });

            const coordinates = features.map((item: any) => item.geometry.coordinates) 
            const properties = features.map((item: any) => item.properties) 

            

            const multiPolygon = {
            	"type": "MultiPolygon",
            	"coordinates": coordinates,
            	"properties": properties

            }

            setBaseGeometry(multiPolygon)

            features.length > 0 && setEnvelopData(multiPolygon);
        },[ mapRef ]);

	return (
		<EventsContext.Provider value={{
			isDragging,
			onDragStart,
			onMouseMove,
			onDragEnd,
			onClick
		}}>
			{children}
		</EventsContext.Provider>
	)
}

EventsContext.displayName = "EventsContext";