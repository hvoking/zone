import { useState, useEffect, useContext, createContext } from 'react';

const BuiltAreasContext: React.Context<any> = createContext(null)

export const useBuiltAreas = () => {
	return (
		useContext(BuiltAreasContext)
	)
}

export const BuiltAreasProvider = ({children}: any) => {
	const [ builtAreaFrom, setBuiltAreaFrom ] = useState(0);
	const [ builtAreaTo, setBuiltAreaTo ] = useState(600);

	const [ leftPosition, setLeftPosition ] = useState(0);
	const [ rightPosition, setRightPosition ] = useState(600);

	const minBound = 0;
  	const [ maxBound, setMaxBound ] = useState(600);

  	useEffect(() => {
  	  maxBound < rightPosition && setRightPosition(maxBound);
  	  maxBound < leftPosition && setLeftPosition(maxBound);
  	}, [ maxBound ]);

  	useEffect(() => {
  	  setBuiltAreaTo(rightPosition)
  	}, [rightPosition]);

  	useEffect(() => {
  	  setBuiltAreaFrom(leftPosition)
  	}, [leftPosition]);

	return (
		<BuiltAreasContext.Provider value={{
			builtAreaFrom, setBuiltAreaFrom,
			builtAreaTo, setBuiltAreaTo,
			leftPosition, setLeftPosition,
			rightPosition, setRightPosition,
			minBound, maxBound, setMaxBound,
		}}>
			{children}
		</BuiltAreasContext.Provider>
	)
}

BuiltAreasContext.displayName = "BuiltAreasContext";