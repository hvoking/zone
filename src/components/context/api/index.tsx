// App imports
import { ParcelApiProvider } from './parcel';
import { TrimApiProvider } from './trim';

export const ApiProvider = ({children}: any) => {
  return (
    <TrimApiProvider>
    <ParcelApiProvider>
      {children}
    </ParcelApiProvider>
    </TrimApiProvider>
  )
}

ApiProvider.displayName="ApiProvider";