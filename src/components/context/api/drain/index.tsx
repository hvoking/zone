// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useVisibility } from '../../filters/visibility';
import { useCircle } from '../../filters/circle';

const DrainApiContext: React.Context<any> = createContext(null)

export const useDrainApi = () => {
	return (useContext(DrainApiContext))
}

export const DrainApiProvider = ({children}: any) => {
	const { activeDrain } = useVisibility();
	const { circleGeometry } = useCircle();

	const [ drainData, setDrainData ] = useState<any>(null);

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch(`${process.env.REACT_APP_API_URL}/drain_api`, {
				method: "POST",
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({ 
					"polygon": JSON.stringify(circleGeometry.geometry),
					"schema": "infraestrutura",
					"table": "rede_drenagem"
				}),
			});
			const receivedData = await res.json();
			setDrainData(receivedData);
		}
		activeDrain && fetchData();
	}, [ activeDrain, circleGeometry ]);

	return (
		<DrainApiContext.Provider value={{ drainData }}>
			{children}
		</DrainApiContext.Provider>
	)
}

DrainApiContext.displayName = "DrainApiContext";