// React imports
import { useContext, createContext } from 'react';

// Third-party imports
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { PathLayer } from '@deck.gl/layers';

// Context imports
import { useDrainApi } from '../../../api/drain';
import { useVisibility } from '../../../filters/visibility';

const DrainPathContext: React.Context<any> = createContext(null)

export const useDrain = () => {
	return (useContext(DrainPathContext))
}

export const DrainProvider = ({children}: any) => {
	const { drainData } = useDrainApi();
	const { activeDrain } = useVisibility();

	const drainLayer = drainData &&
		new PathLayer({
			id: 'drain-path',
			data: drainData,
			widthScale: 20,
			widthMinPixels: 2,
			getPath: (d: any) => d.geometry.coordinates[0],
			getColor: (d: any) => [ 33, 33, 255, 255 ],
			getWidth: (d: any) => d.dimensions /  1000,
			visible: activeDrain,
		});
	return (
		<DrainPathContext.Provider value={{ drainLayer }}>
			{children}
		</DrainPathContext.Provider>
	)
}

DrainPathContext.displayName = "DrainPathContext";