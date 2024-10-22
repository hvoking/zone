import { useState, useEffect, useContext, createContext } from 'react';

const ParcelAreasContext: React.Context<any> = createContext(null)

export const useParcelAreas = () => {
	return (
		useContext(ParcelAreasContext)
	)
}

export const ParcelAreasProvider = ({children}: any) => {
	const [ parcelAreaFrom, setParcelAreaFrom ] = useState(100);
	const [ parcelAreaTo, setParcelAreaTo ] = useState(1200);

	const [ leftPosition, setLeftPosition ] = useState(100);
	const [ rightPosition, setRightPosition ] = useState(1200);

	const minBound = 100;
  	const [ maxBound, setMaxBound ] = useState(1200);

  	useEffect(() => {
  	  maxBound < rightPosition && setRightPosition(maxBound);
  	  maxBound < leftPosition && setLeftPosition(maxBound);
  	}, [ maxBound ]);

  	useEffect(() => {
  	  setParcelAreaTo(rightPosition)
  	}, [rightPosition]);

  	useEffect(() => {
  	  setParcelAreaFrom(leftPosition)
  	}, [leftPosition]);

	return (
		<ParcelAreasContext.Provider value={{
			parcelAreaFrom, setParcelAreaFrom,
			parcelAreaTo, setParcelAreaTo,
			leftPosition, setLeftPosition,
			rightPosition, setRightPosition,
			minBound, maxBound, setMaxBound,
		}}>
			{children}
		</ParcelAreasContext.Provider>
	)
}

ParcelAreasContext.displayName = "ParcelAreasContext";