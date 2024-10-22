import { Source, Layer } from 'react-map-gl';
import { useMask } from '../../../context/maps/mask';
import * as turf from '@turf/turf';
import { useMemo } from 'react';

export const Mask = () => {
  const { maskProperties } = useMask();

  // Memoize geometry processing to minimize re-renders
  const geoJsonData = useMemo(() => {
    if (!maskProperties || maskProperties.length === 0) return null; // Handle empty or undefined case

    const baseHeight = 0; // Base of the extrusion
    const buildingHeight = 30; // Arbitrary height for the extruded building

    // Function to offset the geometry inside
    const offsetGeometryInside = (geometry: any, offset: number) => {
      if (!geometry || !geometry.coordinates) return null; // Additional safeguard for geometry
      const polygon: any = turf.polygon(geometry.coordinates);
      const offsettedGeom = turf.buffer(polygon, -offset, { units: 'meters' });
      return offsettedGeom;
    };

    // Add third coordinate (height) to the polygon's coordinates
    const addThirdCoordinate = (coordinates: any, height: number) => {
      if (!coordinates) return null; // Ensure coordinates exist
      return coordinates.map((polygon: any) =>
        polygon.map((coord: any) => [...coord, height])
      );
    };

    // Process all valid maskProperties and create extruded geometries for each
    const features = maskProperties
      .filter((maskProp: any) => maskProp && maskProp.geometry && maskProp.geometry.coordinates) // Ensure maskProp, geometry, and coordinates exist
      .map((maskProp: any) => {
        const offsettedGeometry: any = offsetGeometryInside(maskProp.geometry, 5); // Example offset
        if (!offsettedGeometry || !offsettedGeometry.geometry) return null; // Ensure offsetted geometry is valid
        const extrudedGeometry = addThirdCoordinate(offsettedGeometry.geometry.coordinates, buildingHeight);

        return {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: extrudedGeometry,
          },
          properties: {
            height: buildingHeight,
          },
        };
      })
      .filter((feature: any) => feature !== null); // Filter out invalid features

    // Return null if no valid features were found
    if (features.length === 0) return null;

    return {
      type: 'FeatureCollection',
      features, // All extruded geometries
    };
  }, [maskProperties]); // Recalculate only when maskProperties change

  if (!geoJsonData) return null; // Early return if no valid data

  return (
    <Source id="mask-buildings" type="geojson" data={geoJsonData}>
      <Layer
        id="extruded-buildings"
        type="fill-extrusion"
        paint={{
          'fill-extrusion-color': 'rgba(255, 0, 0, 0.8)', // Red color for the buildings
          'fill-extrusion-height': ['get', 'height'], // Set extrusion height dynamically
          'fill-extrusion-base': 0, // Base height of 0 for all buildings
          'fill-extrusion-opacity': 0.8,
        }}
      />
    </Source>
  );
};

Mask.displayName = 'Mask';
