import { useState, useContext, createContext } from 'react';

const ModuleContext: React.Context<any> = createContext(null)

export const useModule = () => {
	return (
		useContext(ModuleContext)
	)
}

export const ModuleProvider = ({children}: any) => {
	const [ apartmentFront, setApartmentFront ] = useState(8);
	const [ apartmentSide, setApartmentSide ] = useState(8);
	const [ apartmentHeight, setApartmentHeight ] = useState(3);

	const [ apartmentFrontPosition, setApartmentFrontPosition ] = useState(8);
	const [ apartmentSidePosition, setApartmentSidePosition ] = useState(8);
	const [ apartmentHeightPosition, setApartmentHeightPosition ] = useState(3);

	return (
		<ModuleContext.Provider value={{
			apartmentFront, setApartmentFront,
			apartmentSide, setApartmentSide,
			apartmentHeight, setApartmentHeight,
			apartmentFrontPosition, setApartmentFrontPosition,
			apartmentSidePosition, setApartmentSidePosition,
			apartmentHeightPosition, setApartmentHeightPosition,
		}}>
			{children}
		</ModuleContext.Provider>
	)
}

ModuleContext.displayName = "ModuleContext";