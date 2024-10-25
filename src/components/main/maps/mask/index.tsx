// React imports
import { useMemo } from 'react';

// Context imports
import { useMask } from '../../../context/maps/mask';

// Third-party imports
import * as turf from '@turf/turf';
import { Source, Layer } from 'react-map-gl';

const hexToRgba = (hex: any, opacity: any) => {
  if (hex) {
    hex = hex.replace(/^#/, '');

    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return "rgba(0, 0, 0, 0)"
}

export const Mask = () => {
  const { maskProperties } = useMask();

  const geoJsonData = useMemo(() => {
    if (!maskProperties || maskProperties.length === 0) return null;

    const offsetDistance = -5;

    const filterMask = maskProperties.filter((maskProp: any) => maskProp && maskProp.geometry && maskProp.geometry.coordinates)
    
    const features = filterMask.map((maskProp: any) => {
        const offsettedGeometry: any = turf.buffer(maskProp.geometry, offsetDistance, { units: 'meters' });
    
        if (!offsettedGeometry || !offsettedGeometry.geometry) return null;

        const extrudedGeometry = offsettedGeometry.geometry.coordinates;

        const currentColor = hexToRgba(maskProp.properties["zone_color"], 1);

        return {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: extrudedGeometry,
          },
          properties: {
            'zone-color': currentColor,
            height: 10,
          },
        };
      })
      .filter((feature: any) => feature !== null);

    if (features.length === 0) return null;

    return {
      type: 'FeatureCollection',
      features,
    };
  }, [ maskProperties ]);

  if (!geoJsonData) return null;

  return (
    <Source id="mask-buildings" type="geojson" data={geoJsonData}>
      <Layer
        id="extruded-buildings"
        type="fill-extrusion"
        paint={{
          'fill-extrusion-color': ['get', 'zone-color'],
          'fill-extrusion-base': 2,
          'fill-extrusion-height': 12,
          'fill-extrusion-opacity': 0.8,
        }}
      />
    </Source>
  );
};

Mask.displayName = 'Mask';
