// App imports
import { ApartmentSizesProvider } from './apartment';
import { ElevationSizesProvider } from './elevation';
import { LayoutSizesProvider } from './layout';
import { ParcelSizesProvider } from './parcel';
import { PerspectiveSizesProvider } from './perspective';

export const RightSizesProvider = ({children}: any) => {
  return (
    <ApartmentSizesProvider>
    <ElevationSizesProvider>
    <LayoutSizesProvider>
    <ParcelSizesProvider>
    <PerspectiveSizesProvider>
      {children}
    </PerspectiveSizesProvider>
    </ParcelSizesProvider>
    </LayoutSizesProvider>
    </ElevationSizesProvider>
    </ApartmentSizesProvider>
  )
}

RightSizesProvider.displayName="RightSizesProvider";