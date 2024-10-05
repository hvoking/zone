// React imports
import { useContext, createContext } from 'react';

// Context imports
import { useCircleDimensions } from '../../../filters/dimensions/circle';
import { useStyleSheet } from '../../../filters/stylesheet';

// Third-party imports
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { GeoJsonLayer } from 'deck.gl';

const CircleLayerContext: React.Context<any> = createContext(null);

export const useCircle = () => {
	return (
		useContext(CircleLayerContext)
	)
}

export const CircleLayerProvider = ({children}: any) => {
	const { circleGeometry } = useCircleDimensions();
	const { fillColor } = useStyleSheet();

	const circleFill = fillColor.replace("rgba(", "").replace(")", "").split(",")
	
	circleFill[3] = 20;

	const circleLayer = circleGeometry &&
		new GeoJsonLayer({
			id: 'circle',
			data: circleGeometry.features[0].geometry,
			getFillColor: circleFill.map((item: any) => parseInt(item)),
			getLineColor: [126, 126, 132, 80],
			parameters: { depthTest: false },
			getLineWidth: 1,
		});

	return (
		<CircleLayerContext.Provider value={{ circleLayer }}>
			{children}
		</CircleLayerContext.Provider>
	)
}

CircleLayerContext.displayName = "CircleLayerContext";