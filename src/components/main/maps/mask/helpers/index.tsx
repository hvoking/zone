// Third-party libraries
import * as turf from '@turf/turf';

export const offsetGeometryInside = (geometry: any, offset: number) => {
  if (!geometry || !geometry.coordinates) return null; // Additional safeguard for geometry
  const polygon: any = turf.polygon(geometry.coordinates);
  const offsettedGeom = turf.buffer(polygon, -offset, { units: 'meters' });
  return offsettedGeom;
};

// Add third coordinate (height) to the polygon's coordinates
export const addThirdCoordinate = (coordinates: any, height: number) => {
  if (!coordinates) return null; // Ensure coordinates exist
  return coordinates.map((polygon: any) =>
    polygon.map((coord: any) => [...coord, height])
  );
};