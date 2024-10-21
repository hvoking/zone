// App imports
import { ParcelApiProvider } from './parcel';
import { GeomApiProvider } from './geom';

export const ApiProvider = ({children}: any) => {
  return (
    <GeomApiProvider>
    <ParcelApiProvider>
      {children}
    </ParcelApiProvider>
    </GeomApiProvider>
  )
}

ApiProvider.displayName="ApiProvider";