// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useGeo } from '../../filters/geo';

const CurvesApiContext: React.Context<any> = createContext(null)

export const useCurvesApi = () => {
	return (useContext(CurvesApiContext))
}

export const CurvesApiProvider = ({children}: any) => {
	const { baseGeometry } = useGeo();
	const [ curvesData, setCurvesData ] = useState<any>(null);

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch(`${process.env.REACT_APP_API_URL}/trim_api`, {
				method: "POST",
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({ 
					"polygon": JSON.stringify(baseGeometry),
					"table_schema": "ambiental",
					"table_name": "blumenau_curvas"
				}),
			});
			const receivedData = await res.json();
			setCurvesData(receivedData);
		}
		baseGeometry && fetchData();
	}, [ baseGeometry ]);

	return (
		<CurvesApiContext.Provider value={{ curvesData }}>
			{children}
		</CurvesApiContext.Provider>
	)
}

CurvesApiContext.displayName = "CurvesApiContext";