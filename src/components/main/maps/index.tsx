// React imports
import { useEffect, useCallback } from 'react';

// App imports
import { Avatar } from './avatar';
import { Controllers } from './controllers';
import { Wrapper } from './wrapper'
import { Tiles } from './tiles';
import { Circle } from './circle';
import { Mask } from './mask';

// Layers imports
import { Layers } from './layers';

// Context imports
import { useGeo } from '../../context/filters/geo';
import { useCircle } from '../../context/filters/circle';
import { useEvents } from '../../context/maps/events';
import { useVisibility } from '../../context/filters/visibility';

// Third-party imports
import { Map } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export const Maps = () => {
  const { mapRef, basemap, viewport, setPlaceCoordinates } = useGeo();
  const { isDragging, onDragStart, onMouseMove, onDragEnd, onClick } = useEvents();
  const { circleGeometry } = useCircle();
  const { activeBuildings } = useVisibility();

  const onDblClick = useCallback((e: any) => {
    const lng = e.lngLat.lng;
    const lat = e.lngLat.lat;
    setPlaceCoordinates({ longitude: lng, latitude: lat });
  }, []); 

  const onMapLoad = () => {
    const map = mapRef.current?.getMap();
    
    if (map) {
      map.addSource('eraser', {
        type: 'geojson',
        data: circleGeometry.geometry,
      });

      map.addLayer({
        id: 'eraser',
        type: 'clip',
        source: 'eraser',
        layout: {
          'clip-layer-types': ['model']
        },
        minzoom: 14
      });
    }
  };

  useEffect(() => {
      const map = mapRef.current?.getMap();
      if (map && map.getSource('eraser')) {
        map.getSource('eraser').setData(circleGeometry.geometry);
      }
    }, [ circleGeometry ]);

  return (
    <Wrapper>
      <Map
        ref={mapRef}
        mapStyle={basemap}
        initialViewState={viewport} 
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        doubleClickZoom={false}
        onLoad={onMapLoad}
        onDblClick={onDblClick}
        onMouseDown={onDragStart}
        onMouseMove={onMouseMove}
        onMouseUp={onDragEnd}
        onTouchStart={onDragStart}
        onTouchMove={onMouseMove}
        onTouchEnd={onDragEnd}
        dragPan={!isDragging}
        onClick={onClick}
      >
        <Layers/>
        <Circle/>
        <Controllers/>
        <Tiles/>
        {activeBuildings && <Mask/>}
        <Avatar/>
      </Map>

    </Wrapper>
  );
}

Maps.displayName="Maps";