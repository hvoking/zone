// React imports
import { useContext, createContext } from 'react';

// Functions import
import { maxOffsetGeom, nearestPoints, linesToPolygon } from './helpers';

// Context imports
import { useEnvelopApi } from '../../api/parcel/envelop';

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

	const envelopLines = [];
	const envelopPolygons = [];
	const baseGeom = envelopData.coordinates;
	
	let topGeom = maxOffsetGeom(baseGeom);
	let basePoints = baseGeom[0][0];

	while (topGeom.length > 1) {
	    const lines = nearestPoints([[basePoints]], topGeom);
		const polygons = linesToPolygon(lines);
		basePoints = lines.map((item: any) => item[1]);
		lines.map((item: any, index: number) => lines[index] = turf.lineString(item));

		envelopLines.push(lines);
		envelopPolygons.push(polygons);

		topGeom = maxOffsetGeom([[topGeom]]);
	}
	
	const envelopLayer = [
		envelopPolygons.map((item: any, index: any) => {
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
		envelopLines.map((item: any, index: any) => {
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