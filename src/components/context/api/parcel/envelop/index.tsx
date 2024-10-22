// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useGeo } from '../../../filters/geo';

import { data } from './data';

const EnvelopApiContext: React.Context<any> = createContext(null);

export const useEnvelopApi = () => {
	return (
		useContext(EnvelopApiContext)
	)
}

export const EnvelopApiProvider = ({children}: any) => {
  const { parcelId } = useGeo();
  const [ envelopData, setEnvelopData ] = useState<any>(data);

  return (
		<EnvelopApiContext.Provider value={{ envelopData }}>
			{children}
		</EnvelopApiContext.Provider>
	)
}

EnvelopApiContext.displayName="EnvelopApiContext";