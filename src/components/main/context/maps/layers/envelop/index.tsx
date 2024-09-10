// React imports
import { useContext, createContext } from 'react';

// Functions import
import { maxOffsetGeom, nearestPoints, linesToPolygon } from './helpers';

// Context imports
import { useEnvelopApi } from '../../../api/parcel/envelop';
import { useStyleSheet } from '../../../filters/stylesheet';

// Third party imports
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { GeoJsonLayer } from 'deck.gl';
import * as turf from 'turf';

const EnvelopContext: React.Context<any> = createContext(null)

export const useEnvelop = () => {
	return (useContext(EnvelopContext))
}

export const EnvelopProvider = ({children}: any) => {
	const { envelopData } = useEnvelopApi();
	const { linesColor, fillColor, linesWidth } = useStyleSheet();
	const polygonFill = fillColor.replace("rgba(", "").replace(")", "").split(",");
	polygonFill[3] = +polygonFill[3] * 255;

	const strokeColor = linesColor.replace("rgba(", "").replace(")", "").split(",");
	strokeColor[3] = 20;

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
				getFillColor: polygonFill.map((item: any) => parseInt(item)),
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
				getLineColor: strokeColor.map((item: any) => parseInt(item)),
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