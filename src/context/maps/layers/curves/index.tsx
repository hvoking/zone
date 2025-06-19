// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// App imports
import { useTrimApi } from 'context/api/trim';
import { useVisibility } from 'context/filters/visibility';
import { useCircle } from 'context/filters/circle';

// Third-party imports
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { PathLayer } from '@deck.gl/layers';

const CurvesContext: React.Context<any> = createContext(null)

export const useCurves = () => {
	return (useContext(CurvesContext))
}
export const CurvesProvider = ({children}: any) => {
	const { fetchData } = useTrimApi();
	const { activeCurves } = useVisibility();
	const { circleGeometry } = useCircle();

	const [ trimData, setTrimData ] = useState<any>(null);

	const trimBoundary = circleGeometry.geometry

	const tableSchema = "ambiental"
	const tableName = "blumenau_curvas"
	const tableColumn = "elevation"

    useEffect(() => {
    	const loadData = async () => {
			const data = await fetchData(trimBoundary, tableSchema, tableName, tableColumn);
			setTrimData(data);
		}
		activeCurves && loadData();
	}, [ activeCurves, circleGeometry ]);
	
	const curvesLayer = trimData &&
		new PathLayer({
			id: 'curves-path',
			data: trimData,
			pickable: false,
			capRounded: true,
			jointRounded: true,
			getPath: (d: any) => d.geometry.coordinates[0],
			getColor: (d: any) => [ 0, 255, 0, 80 ],
			getWidth: 1,
			visible: activeCurves,
		});
	return (
		<CurvesContext.Provider value={{ curvesLayer }}>
			{children}
		</CurvesContext.Provider>
	)
}
CurvesContext.displayName = "CurvesContext";