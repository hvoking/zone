// App imports
import { GeoProvider } from './geo';
import { ModuleProvider } from './module';
import { VectorsProvider } from './vectors';
import { BuildingProvider } from './building';
import { VisibilityProvider } from './visibility';
import { StyleSheetProvider } from './stylesheet';
import { AreasProvider } from './areas';
import { CircleProvider } from './circle';

export const FiltersProvider = ({children}: any) => {
  return (
    <VisibilityProvider>
    <VectorsProvider>
    <GeoProvider>
    <ModuleProvider>
    <BuildingProvider>
    <StyleSheetProvider>
    <AreasProvider>
    <CircleProvider>
      {children}
    </CircleProvider>
    </AreasProvider>
    </StyleSheetProvider>
    </BuildingProvider>
    </ModuleProvider>
    </GeoProvider>
    </VectorsProvider>
    </VisibilityProvider>
  )
}

FiltersProvider.displayName="FiltersProvider";