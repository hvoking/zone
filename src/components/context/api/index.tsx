// App imports
import { ParcelApiProvider } from './parcel';
import { DrainApiProvider } from './drain';
import { TrimApiProvider } from './trim';
import { CurvesApiProvider } from './curves';

export const ApiProvider = ({children}: any) => {
  return (
    <DrainApiProvider>
    <TrimApiProvider>
    <CurvesApiProvider>
    <ParcelApiProvider>
      {children}
    </ParcelApiProvider>
    </CurvesApiProvider>
    </TrimApiProvider>
    </DrainApiProvider>
  )
}

ApiProvider.displayName="ApiProvider";