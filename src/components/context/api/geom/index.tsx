// App imports
import { DrainApiProvider } from './drain';
import { ParcelsCurvesApiProvider } from './curves/parcels';
import { ParcelCurvesApiProvider } from './curves/parcel';

export const GeomApiProvider = ({ children }: any) => {
	return (
		<DrainApiProvider>
		<ParcelsCurvesApiProvider>
		<ParcelCurvesApiProvider>
			{children}
		</ParcelCurvesApiProvider>
		</ParcelsCurvesApiProvider>
		</DrainApiProvider>
	)
}

GeomApiProvider.displayName="GeomApiProvider";