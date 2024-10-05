// App imports
import { FrontElevationSizesProvider } from './front';
import { SideElevationSizesProvider } from './side';

export const ElevationSizesProvider = ({ children }: any) => {
	return (
		<FrontElevationSizesProvider>
		<SideElevationSizesProvider>
			{ children }
		</SideElevationSizesProvider>	
		</FrontElevationSizesProvider>
	)
}

ElevationSizesProvider.displayName="ElevationSizesProvider";