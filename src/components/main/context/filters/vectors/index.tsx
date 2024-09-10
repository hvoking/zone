// React imports
import { useContext, createContext } from 'react';

const VectorsContext: React.Context<any> = createContext(null)

export const useVectors = () => {
	return (
		useContext(VectorsContext)
	)
}

export const VectorsProvider = ({children}: any) => {
	const caLeft = -65.2;
	const coLeft = -37.6;
	
	const caRight = 106.94;
	const coRight = -61.77;

	const getHipotenusa = (co: number, ca: number) => {
		return Math.sqrt(ca**2 + co**2)
	}

	const hipotenusaRight = getHipotenusa(caRight, coRight);
	const hipotenusaLeft = getHipotenusa(caLeft, coLeft);

	const iRight = caRight / hipotenusaRight;
	const jRight = coRight / hipotenusaRight
	const iLeft =  caLeft / hipotenusaLeft;
	const jLeft = coLeft / hipotenusaLeft;

	return (
		<VectorsContext.Provider value={{ iRight, jRight, iLeft, jLeft }}>
			{children}
		</VectorsContext.Provider>
	)
}

VectorsContext.displayName = "VectorsContext";