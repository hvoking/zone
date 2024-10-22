// App imports
import { ElevationSizesProvider } from './elevation';
import { LayoutSizesProvider } from './layout';
import { ParcelSizesProvider } from './parcel';
import { PerspectiveSizesProvider } from './perspective';

export const RightSizesProvider = ({children}: any) => {
  return (
    <ElevationSizesProvider>
    <LayoutSizesProvider>
    <ParcelSizesProvider>
    <PerspectiveSizesProvider>
      {children}
    </PerspectiveSizesProvider>
    </ParcelSizesProvider>
    </LayoutSizesProvider>
    </ElevationSizesProvider>
  )
}

RightSizesProvider.displayName="RightSizesProvider";