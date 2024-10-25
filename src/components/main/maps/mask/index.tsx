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

    const offsetDistance = -6;
    const maxIterations = 10;

    const features = maskProperties.flatMap((maskProp: any) => {
      const baseGeometries = [];
      let currentGeometry = maskProp.geometry;
      let totalOffsetDistance = 0;
      for (let i = 0; i < maxIterations; i++) {
        const nextGeometry = turf.buffer(currentGeometry, offsetDistance, { units: 'meters' });

        if (!nextGeometry || turf.area(nextGeometry) <= 0) {
          break;
        }

        totalOffsetDistance += Math.abs(offsetDistance); // Accumulate the absolute distance

        const height = 6 * totalOffsetDistance;
        const currentColor = hexToRgba(maskProp.properties["zone_color"], 1);

        baseGeometries.push({
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: nextGeometry.geometry.coordinates,
          },
          properties: {
            'zone-color': currentColor,
            'extrusion-height': height,
          },
        });

        currentGeometry = nextGeometry;
      }

      return baseGeometries;
    });

    if (features.length === 0) return null;

    return {
      type: 'FeatureCollection',
      features,
    };
  }, [maskProperties]);

  if (!geoJsonData) return null;

  return (
    <Source id="mask-buildings" type="geojson" data={geoJsonData}>
      <Layer
        id="extruded-buildings"
        type="fill-extrusion"
        paint={{
          'fill-extrusion-color': ['get', 'zone-color'],
          'fill-extrusion-base': 2,
          'fill-extrusion-height': ['get', 'extrusion-height'],
          'fill-extrusion-opacity': 0.8,
        }}
      />
    </Source>
  );
};

Mask.displayName = 'Mask';
