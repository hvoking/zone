// App imports
import { LayersProvider } from './layers';
import { EventsProvider } from './events';
import { MaskProvider } from './mask';
import { CircleProvider } from './circle';

export const MapsProvider = ({children}: any) => {
  return (
    <CircleProvider>
    <LayersProvider>
    <EventsProvider>
    <MaskProvider>
      {children}
    </MaskProvider>
    </EventsProvider>
    </LayersProvider>
    </CircleProvider>
  )
}

MapsProvider.displayName="MapsProvider";