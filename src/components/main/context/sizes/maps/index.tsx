// App imports
import { SVGMapSizesProvider } from './svgMap';

export const MapSizesProvider = ({children}: any) => {
  return (
    <SVGMapSizesProvider>
      {children}
    </SVGMapSizesProvider>
  )
}

MapSizesProvider.displayName="MapSizesProvider";