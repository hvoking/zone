// App imports
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
    </VectorsProvider>
    </VisibilityProvider>
  )
}

FiltersProvider.displayName="FiltersProvider";