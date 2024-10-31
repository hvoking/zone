// React imports
import { useContext, createContext } from 'react';

// App imports
import { useTrimApi } from '../../../api/trim';
import { useVisibility } from '../../../filters/visibility';

// Third-party imports
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { PathLayer } from '@deck.gl/layers';

const CurvesContext: React.Context<any> = createContext(null)

export const useCurves = () => {
	return (useContext(CurvesContext))
}
export const CurvesProvider = ({children}: any) => {
	const { trimData } = useTrimApi();
	const { activeCurves } = useVisibility();
	
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