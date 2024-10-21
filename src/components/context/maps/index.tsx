// App imports
import { LayersProvider } from './layers';
import { EventsProvider } from './events';
import { MaskProvider } from './mask';

export const MapsProvider = ({children}: any) => {
  return (
    <LayersProvider>
    <EventsProvider>
    <MaskProvider>
      {children}
    </MaskProvider>
    </EventsProvider>
    </LayersProvider>
  )
}

MapsProvider.displayName="MapsProvider";