// React imports
import { useContext, createContext } from 'react';

// Context imports
import { useEnvelopApi } from '../../../api/parcel/envelop';
import { useBuildingApi } from '../../../api/parcel/building';

// Third party imports
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { GeoJsonLayer } from 'deck.gl';
import * as turf from '@turf/turf';

const BuildingContext: React.Context<any> = createContext(null)

export const useBuilding = () => {
	return (useContext(BuildingContext))
}

export const BuildingProvider = ({children}: any) => {
	const { envelopData } = useEnvelopApi();
	const { buildingData } = useBuildingApi();

	if (!envelopData || !buildingData) return <></>

	const frontBlocks = buildingData.front_blocks;
	const heights = Object.keys(frontBlocks);

	const offsetGeometryInside = (multiPolygon: any, offset: any) => {
	    const polygon: any = turf.multiPolygon(multiPolygon.coordinates);
	    const offsettedGeom = turf.buffer(polygon, -offset, {units: 'meters'});
	    return offsettedGeom;
	}

	const addThirdCoordinate = (obj: any, height: any) => {
		if (obj) {
			const filterGeom = obj.geometry && 
				obj.geometry.coordinates.length === 1 ?
				obj.geometry.coordinates :
				obj.geometry.coordinates[0];

	        obj.geometry && filterGeom.forEach((polygon: any) => {
	        	polygon.forEach((coord: any) => {coord.push(parseInt(height))});
	        });
		    return obj;
	    }
	    return null;
	}

	const createBuilding = (height: any, lastHeight: any) => {
		const buildingOffset = offsetGeometryInside(envelopData, height / 6);
		const buildingWithHeight = addThirdCoordinate(buildingOffset, lastHeight);
		return buildingWithHeight
	}

	const buildingLayer = heights.map((item: any, index: any) => {
		const lastHeight: any = index > 0 ? heights[index - 1] : 0;
		const building = createBuilding(item, lastHeight);

		return new GeoJsonLayer({
			id: `lot-building-${index}`,
			pickable: true,
			data: building,
			getFillColor: [255, 0, 0, 120],
			parameters: { depthTest: false },
			extruded: true,
			getElevation: item - lastHeight,
		})
	})

	return (
		<BuildingContext.Provider value={{ buildingLayer }}>
			{children}
		</BuildingContext.Provider>
	)
}

BuildingContext.displayName = "BuildingContext";