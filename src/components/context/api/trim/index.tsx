// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useVisibility } from '../../filters/visibility';
import { useCircle } from '../../filters/circle';

const TrimApiContext: React.Context<any> = createContext(null)

export const useTrimApi = () => {
	return (useContext(TrimApiContext))
}

export const TrimApiProvider = ({children}: any) => {
	const [ trimData, setTrimData ] = useState<any>(null);
	const { activeCurves } = useVisibility();
	const { circleGeometry } = useCircle();

	const table_schema = "ambiental"
	const table_name = "blumenau_curvas"
	const table_column = "elevation"

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch(`${process.env.REACT_APP_API_URL}/trim_api`, {
				method: "POST",
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({ 
					"polygon": JSON.stringify(circleGeometry.geometry),
					"table_schema": table_schema,
					"table_name": table_name,
					"table_column": table_column
				}),
			});
			const receivedData = await res.json();
			setTrimData(receivedData);
		}
		activeCurves && fetchData();
	}, [ activeCurves, circleGeometry ]);

	return (
		<TrimApiContext.Provider value={{ trimData }}>
			{children}
		</TrimApiContext.Provider>
	)
}

TrimApiContext.displayName = "TrimApiContext";