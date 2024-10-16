// App imports
import { ParcelApiProvider } from './parcel';
import { GoogleApiProvider } from './google';
import { GeomApiProvider } from './geom';

export const ApiProvider = ({children}: any) => {
  return (
    <GeomApiProvider>
    <ParcelApiProvider>
    <GoogleApiProvider>
      {children}
    </GoogleApiProvider>
    </ParcelApiProvider>
    </GeomApiProvider>
  )
}

ApiProvider.displayName="ApiProvider";