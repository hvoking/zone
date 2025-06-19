// React imports
import { useMemo } from 'react';

// Context imports
import { useMask } from 'context/maps/mask';

// Third-party imports
import * as turf from '@turf/turf';
import { Source, Layer } from 'react-map-gl/mapbox';

const hexToRgba = (hex: any, opacity: any) => {
  if (hex) {
    hex = hex.replace(/^#/, '');
    const [r, g, b] = [0, 2, 4].map((offset: any) => parseInt(hex.substring(offset, offset + 2), 16));
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return 'rgba(0, 0, 0, 0)';
};

export const Mask = () => {
  const { maskProperties } = useMask();

  const geoJsonData: any = useMemo(() => {
    if (!maskProperties || maskProperties.length === 0) return null;

    const features = maskProperties.flatMap((maskProp: any) => {
      const baseGeometries = [];
      let { geometry } = maskProp;
      const { occupancy_rate, plot_ratio, plot_ratio_max, height, height_max, front_setback, colors } = maskProp.properties;

      const maxDensity = plot_ratio_max || 1;
      const baseHeight = height || 10;
      const maxExtrusionHeight = Math.min(height_max || 50, baseHeight * maxDensity * (occupancy_rate || 1));
      const extrusionSteps = 5;
      const stepHeight = maxExtrusionHeight / extrusionSteps;
      const setbackDistance = front_setback || 4;

      // Apply initial setback
      let currentGeometry = turf.buffer(geometry, -setbackDistance, { units: 'meters' });

      for (let i = 0; i < extrusionSteps; i++) {
        if (!currentGeometry || turf.area(currentGeometry) <= 0) break;

        const extrusionHeight = stepHeight * (i + 1);
        const color = hexToRgba(colors || '#FFFFFF', 0.8);

        baseGeometries.push({
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: currentGeometry.geometry.coordinates,
          },
          properties: {
            'zone-color': color,
            'extrusion-height': extrusionHeight,
          },
        });

        // Buffer the geometry inward for the next layer to simulate layering
        currentGeometry = turf.buffer(currentGeometry, -setbackDistance, { units: 'meters' });
      }

      return baseGeometries;
    });

    return features.length > 0 ? { type: 'FeatureCollection', features } : null;
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