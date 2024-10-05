// App imports
import { GeoProvider } from './geo';
import { DimensionsProvider } from './dimensions';
import { VectorsProvider } from './vectors';
import { BuildingProvider } from './building';
import { VisibilityProvider } from './visibility';
import { StyleSheetProvider } from './stylesheet';

export const FiltersProvider = ({children}: any) => {
  return (
    <VisibilityProvider>
    <VectorsProvider>
    <GeoProvider>
    <DimensionsProvider>
    <BuildingProvider>
    <StyleSheetProvider>
      {children}
    </StyleSheetProvider>
    </BuildingProvider>
    </DimensionsProvider>
    </GeoProvider>
    </VectorsProvider>
    </VisibilityProvider>
  )
}

FiltersProvider.displayName="FiltersProvider";