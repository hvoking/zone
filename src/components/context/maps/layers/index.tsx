// App imports
import { CircleProvider } from './circle';
import { EnvelopProvider } from './envelop';
import { BuildingLayerProvider } from './building';

export const LayersProvider = ({children}: any) => {
  return (
    <CircleProvider>
    <EnvelopProvider>
    <BuildingLayerProvider>
      {children}
    </BuildingLayerProvider>
    </EnvelopProvider>
    </CircleProvider>
  )
}

LayersProvider.displayName="LayersProvider";