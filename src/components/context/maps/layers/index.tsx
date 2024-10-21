// App imports
import { CircleProvider } from './circle';
import { EnvelopProvider } from './envelop';
import { BuildingLayerProvider } from './building';
import { CurvesProvider } from './curves';
import { DrainProvider } from './drain';

export const LayersProvider = ({children}: any) => {
  return (
    <CircleProvider>
    <EnvelopProvider>
    <BuildingLayerProvider>
    <CurvesProvider>
    <DrainProvider>
      {children}
    </DrainProvider>
    </CurvesProvider>
    </BuildingLayerProvider>
    </EnvelopProvider>
    </CircleProvider>
  )
}

LayersProvider.displayName="LayersProvider";