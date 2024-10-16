// App imports
import { CurvesProvider } from './curves';
import { DrainProvider } from './drain';
import { CircleLayerProvider } from './circle';
import { EnvelopProvider } from './envelop';
import { BuildingLayerProvider } from './building';

export const LayersProvider = ({children}: any) => {
  return (
    <CircleLayerProvider>
    <CurvesProvider>
    <DrainProvider>
    <EnvelopProvider>
    <BuildingLayerProvider>
      {children}
    </BuildingLayerProvider>
    </EnvelopProvider>
    </DrainProvider>
    </CurvesProvider>
    </CircleLayerProvider>
  )
}

LayersProvider.displayName="LayersProvider";