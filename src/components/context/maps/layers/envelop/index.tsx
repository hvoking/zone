// React imports
import { useContext, createContext } from 'react';

// Functions import
import { maxOffsetGeom, nearestPoints, linesToPolygon } from './helpers';

// Context imports
import { useEnvelopApi } from '../../../api/envelop';

// Third party imports
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { GeoJsonLayer } from 'deck.gl';
import * as turf from '@turf/turf';

const EnvelopContext: React.Context<any> = createContext(null)

export const useEnvelop = () => {
	return (useContext(EnvelopContext))
}

export const EnvelopProvider = ({children}: any) => {
	const { envelopData } = useEnvelopApi();

	const linesColor = [255, 255, 255, 20];
	const fillColor = [255, 255, 255, 40];
	const linesWidth  = 0.3;

	if (!envelopData) return <></>

	const { coordinates } = envelopData;		
	let topGeom = maxOffsetGeom(coordinates);

	let basePoints = coordinates[0][0];

	const lines = [];
	const polygons = [];

	while (topGeom.length > 1) {
	    const nearest = nearestPoints([[basePoints]], topGeom);
		const newPolygons = linesToPolygon(nearest);

		basePoints = nearest.map((item: any) => item[1]);

		lines.push(nearest.map((item: any) => turf.lineString(item)));
      	polygons.push(newPolygons);

		topGeom = maxOffsetGeom([[topGeom]]);
	}
	
	const envelopLayer = [
		polygons.map((item: any, index: any) => {
			return new GeoJsonLayer({
				id: `envelop-polygons-${index}`,
				data: turf.multiPolygon(item),
				getFillColor: fillColor.map((item: any) => parseInt(item)),
				getLineWidth: 0,
				parameters: { depthTest: false },
			})
		})
	]
	const envelopLinesLayer = [
		lines.map((item: any, index: any) => {
			return new GeoJsonLayer({
				id: `envelop-lines-${index}`,
				data: turf.featureCollection(item),
				getLineColor: linesColor.map((item: any) => parseInt(item)),
				getLineWidth: linesWidth,
			})
		})
	]

	return (
		<EnvelopContext.Provider value={{ envelopLayer, envelopLinesLayer }}>
			{children}
		</EnvelopContext.Provider>
	)
}

EnvelopContext.displayName = "EnvelopContext";