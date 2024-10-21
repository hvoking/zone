// App imports
import { CurvesProvider } from './curves';
import { DrainProvider } from './drain';
import { CircleProvider } from './circle';
import { EnvelopProvider } from './envelop';
import { BuildingLayerProvider } from './building';

export const LayersProvider = ({children}: any) => {
  return (
    <CircleProvider>
    <CurvesProvider>
    <DrainProvider>
    <EnvelopProvider>
    <BuildingLayerProvider>
      {children}
    </BuildingLayerProvider>
    </EnvelopProvider>
    </DrainProvider>
    </CurvesProvider>
    </CircleProvider>
  )
}

LayersProvider.displayName="LayersProvider";