// App imports
import { ParcelApiProvider } from './parcel';
import { DrainApiProvider } from './drain';
import { ParcelsCurvesApiProvider } from './curves/parcels';
import { ParcelCurvesApiProvider } from './curves/parcel';

export const ApiProvider = ({children}: any) => {
  return (
    <DrainApiProvider>
    <ParcelsCurvesApiProvider>
    <ParcelCurvesApiProvider>
    <ParcelApiProvider>
      {children}
    </ParcelApiProvider>
    </ParcelCurvesApiProvider>
    </ParcelsCurvesApiProvider>
    </DrainApiProvider>
  )
}

ApiProvider.displayName="ApiProvider";