// React imports
import { useState, useContext, createContext } from 'react';

const PerspectiveSizesContext: React.Context<any> = createContext(null)

export const usePerspectiveSizes = () => {
	return (
		useContext(PerspectiveSizesContext)
	)
}

export const PerspectiveSizesProvider = ({children}: any) => {
	const [ width, setWidth ] = useState<any>(null);
	const [ height, setHeight ] = useState<any>(null);

	const margin = {top: 0, bottom: 10, left: 20, right: 20}

	const innerWidth = width - margin.right - margin.left;
	const innerHeight = height - margin.top - margin.bottom;

	return (
		<PerspectiveSizesContext.Provider value={{
			margin,
			width,
			height,
			setWidth,
			setHeight,
			innerWidth,
			innerHeight,
		}}>
			{children}
		</PerspectiveSizesContext.Provider>
	)
}

PerspectiveSizesContext.displayName = "PerspectiveSizesContext";