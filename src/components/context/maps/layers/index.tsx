// App imports
import { EnvelopProvider } from './envelop';
import { BuildingProvider } from './building';
import { CurvesProvider } from './curves';
import { DrainProvider } from './drain';

export const LayersProvider = ({children}: any) => {
  return (
    <EnvelopProvider>
    <BuildingProvider>
    <CurvesProvider>
    <DrainProvider>
      {children}
    </DrainProvider>
    </CurvesProvider>
    </BuildingProvider>
    </EnvelopProvider>
  )
}

LayersProvider.displayName="LayersProvider";