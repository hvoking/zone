import { useState, useContext, createContext } from 'react';

const ModuleDimensionsContext: React.Context<any> = createContext(null)

export const useModuleDimensions = () => {
	return (
		useContext(ModuleDimensionsContext)
	)
}

export const ModuleDimensionsProvider = ({children}: any) => {
	const [ apartmentFront, setApartmentFront ] = useState(8);
	const [ apartmentSide, setApartmentSide ] = useState(8);
	const [ apartmentHeight, setApartmentHeight ] = useState(3);

	const [ apartmentFrontPosition, setApartmentFrontPosition ] = useState(8);
	const [ apartmentSidePosition, setApartmentSidePosition ] = useState(8);
	const [ apartmentHeightPosition, setApartmentHeightPosition ] = useState(3);

	return (
		<ModuleDimensionsContext.Provider value={{
			apartmentFront, setApartmentFront,
			apartmentSide, setApartmentSide,
			apartmentHeight, setApartmentHeight,
			apartmentFrontPosition, setApartmentFrontPosition,
			apartmentSidePosition, setApartmentSidePosition,
			apartmentHeightPosition, setApartmentHeightPosition,
		}}>
			{children}
		</ModuleDimensionsContext.Provider>
	)
}

ModuleDimensionsContext.displayName = "ModuleDimensionsContext";