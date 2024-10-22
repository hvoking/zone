import * as turf from '@turf/turf';

export const maxOffsetGeom = (baseGeom: any) => {
    const coordinates = baseGeom[0];
    let offsettedGeom = coordinates;

    let height = 0;
    let offset = 0;
    let previousGeom = null;

    if (coordinates[0][0].length === 3) {height = coordinates[0][0][2]}

    while (offsettedGeom && offsettedGeom.length > 0) {
        const offsetGeomLength = offsettedGeom.length;
        const previousGeomLength = previousGeom && previousGeom.length;
        if (offsetGeomLength < previousGeomLength) {
            break
        }
        previousGeom = offsettedGeom;
        offset += 1;
        const buffer = turf.buffer(turf.polygon(coordinates), -offset, {units: 'meters'});
        offsettedGeom = buffer?.geometry.coordinates[0];
    }
    height += offset * 6;
    previousGeom.map((item: any, index: any) => previousGeom[index] = [...item, height]);
    return previousGeom
}

export const nearestPoints = (polygon: any, topGeom: any) => {
    const lines: any = []
    const points: any = turf.featureCollection(topGeom.map((item: any) => turf.point(item)));

    polygon[0][0].forEach((targetPoint: any) => {
        const nearest: any = turf.nearestPoint(targetPoint, points);
        const vertices = [targetPoint, nearest.geometry.coordinates]
        lines.push(vertices);
    }); 
    return lines
}

export const linesToPolygon = (lines: any) => {
    const linesCopy = structuredClone(lines)
    const multiPolygon = [];
    // creating polygons from vertices in lines
    for (let i = 0; i < linesCopy.length - 1; i++) {
        const line1 = linesCopy[i].reverse();
        const line2 = linesCopy[i + 1];
        multiPolygon.push([[...line1, ...line2]])
    }
    return multiPolygon
}