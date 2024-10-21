// React imports
import { useContext, createContext } from 'react';

// App imports
import { useParcelsCurvesApi } from '../../../api/geom/curves/parcels';
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
	const { parcelsCurvesData } = useParcelsCurvesApi();
	const { activeCurves } = useVisibility();
	
	const curvesLayer = parcelsCurvesData &&
		new PathLayer({
			id: 'curves-path',
			data: parcelsCurvesData,
			pickable: false,
			capRounded: true,
			jointRounded: true,
			getPath: (d: any) => d[1].coordinates[0],
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