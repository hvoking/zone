// App imports
import { GeoProvider } from './geo';
import { ModuleProvider } from './module';
import { VectorsProvider } from './vectors';
import { BuildingProvider } from './building';
import { VisibilityProvider } from './visibility';
import { StyleSheetProvider } from './stylesheet';

export const FiltersProvider = ({children}: any) => {
  return (
    <VisibilityProvider>
    <VectorsProvider>
    <GeoProvider>
    <ModuleProvider>
    <BuildingProvider>
    <StyleSheetProvider>
      {children}
    </StyleSheetProvider>
    </BuildingProvider>
    </ModuleProvider>
    </GeoProvider>
    </VectorsProvider>
    </VisibilityProvider>
  )
}

FiltersProvider.displayName="FiltersProvider";