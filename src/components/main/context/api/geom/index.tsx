// App imports
import { DrainApiProvider } from './drain';
import { ParcelsApiProvider } from './parcels';
import { ParcelsCurvesApiProvider } from './curves/parcels';
import { ParcelCurvesApiProvider } from './curves/parcel';

export const GeomApiProvider = ({ children }: any) => {
	return (
		<ParcelsApiProvider>
		<DrainApiProvider>
		<ParcelsCurvesApiProvider>
		<ParcelCurvesApiProvider>
			{children}
		</ParcelCurvesApiProvider>
		</ParcelsCurvesApiProvider>
		</DrainApiProvider>
		</ParcelsApiProvider>
	)
}

GeomApiProvider.displayName="GeomApiProvider";