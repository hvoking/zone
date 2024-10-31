// React imports
import { useState, useContext, createContext } from 'react';

const VisibilityContext: React.Context<any> = createContext(null)

export const useVisibility = () => {
	return (useContext(VisibilityContext))
}

export const VisibilityProvider = ({children}: any) => {
	const [ activeCurves, setActiveCurves ] = useState(false);
	const [ activeDrain, setActiveDrain ] = useState(false);
	const [ activeBuildings, setActiveBuildings ] = useState(true);

	return (
		<VisibilityContext.Provider value={{ 
			activeCurves, setActiveCurves,
			activeDrain, setActiveDrain,
			activeBuildings, setActiveBuildings,
		}}>
			{children}
		</VisibilityContext.Provider>
	)
}

VisibilityContext.displayName = "VisibilityContext";