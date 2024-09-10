// App imports
import { ParcelApiProvider } from './parcel';
import { GoogleApiProvider } from './google';
import { GeomApiProvider } from './geom';
import { PolygonApiProvider } from './polygon';

export const ApiProvider = ({children}: any) => {
  return (
    <PolygonApiProvider>
    <GeomApiProvider>
    <ParcelApiProvider>
    <GoogleApiProvider>
      {children}
    </GoogleApiProvider>
    </ParcelApiProvider>
    </GeomApiProvider>
    </PolygonApiProvider>
  )
}

ApiProvider.displayName="ApiProvider";