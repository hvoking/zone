// App imports
import { CircleProvider } from './circle';
import { EnvelopProvider } from './envelop';
import { BuildingLayerProvider } from './building';
import { CurvesProvider } from './curves';

export const LayersProvider = ({children}: any) => {
  return (
    <CircleProvider>
    <EnvelopProvider>
    <BuildingLayerProvider>
    <CurvesProvider>
      {children}
    </CurvesProvider>
    </BuildingLayerProvider>
    </EnvelopProvider>
    </CircleProvider>
  )
}

LayersProvider.displayName="LayersProvider";