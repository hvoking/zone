// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Third-party imports
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { PathLayer } from '@deck.gl/layers';

// Context imports
import { useTrimApi } from 'context/api/trim';
import { useVisibility } from 'context/filters/visibility';
import { useCircle } from 'context/filters/circle';

const DrainPathContext: React.Context<any> = createContext(null)

export const useDrain = () => {
	return (useContext(DrainPathContext))
}

export const DrainProvider = ({children}: any) => {
	const { fetchData } = useTrimApi();
	const { activeDrain } = useVisibility();
	const { circleGeometry } = useCircle();

	const [ drainData, setDrainData ] = useState<any>(null);

	const polygon = circleGeometry.geometry;
	const tableSchema = "infraestrutura";
	const tableName = "rede_drenagem";
	const tableColumn = "dimensions";

    useEffect(() => {
    	const loadData = async () => {
			const data = await fetchData(polygon, tableSchema, tableName, tableColumn);
			setDrainData(data);
		}
		activeDrain && loadData();
	}, [ activeDrain, circleGeometry ]);

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