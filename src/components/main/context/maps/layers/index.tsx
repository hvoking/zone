// App imports
import { CurvesProvider } from './curves';
import { DrainProvider } from './drain';
import { ParcelsProvider } from './parcels';
import { CircleLayerProvider } from './circle';
import { EnvelopProvider } from './envelop';
import { BuildingLayerProvider } from './building';

export const LayersProvider = ({children}: any) => {
  return (
    <CircleLayerProvider>
    <CurvesProvider>
    <DrainProvider>
    <ParcelsProvider>
    <EnvelopProvider>
    <BuildingLayerProvider>
      {children}
    </BuildingLayerProvider>
    </EnvelopProvider>
    </ParcelsProvider>
    </DrainProvider>
    </CurvesProvider>
    </CircleLayerProvider>
  )
}

LayersProvider.displayName="LayersProvider";