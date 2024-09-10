// React imports
import { useEffect, useContext, createContext } from 'react';

// Context imports
import { useParcelsApi } from '../../../api/geom/parcels';
import { useGoogleReverseApi } from '../../../api/google/reverse';
import { useGeo } from '../../../filters/geo';
import { useParcelDimensions } from '../../../filters/dimensions/parcel';
import { useBuiltDimensions } from '../../../filters/dimensions/built';
import { useVisibility } from '../../../filters/visibility';

// Third party imports
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { PolygonLayer } from 'deck.gl';

const ParcelsContext: React.Context<any> = createContext(null)

export const useParcels = () => {
	return (useContext(ParcelsContext))
}

export const ParcelsProvider = ({children}: any) => {
	const { parcelsData } = useParcelsApi();
	const { parcelId, setParcelId } = useGeo();
	const { parcelAreaFrom, parcelAreaTo } = useParcelDimensions();
	const { builtAreaFrom, builtAreaTo } = useBuiltDimensions();
	const { parcelsProperties, setParcelLongitude, setParcelLatitude } = useGoogleReverseApi();
	const { activeLots } = useVisibility();

	const onClick = (e: any) => { 
		const parcelId = e.object.id;
		setParcelId(parcelId);
	}

	useEffect(() => {
		const getParcelParameters = () => {
			const currentParcel = parcelsData.filter((item: any) => item.id === parcelId);
			
			const currentCentroid = currentParcel.length > 0 ? currentParcel[0].centroid : null;
			currentCentroid && setParcelLongitude(currentCentroid.coordinates[0]);
			currentCentroid && setParcelLatitude(currentCentroid.coordinates[1]);
		}
		parcelsData && getParcelParameters();
	}, [ parcelId, parcelsData]);

	const filterParcelData = parcelsData && parcelsData.filter((item: any) => 
		item.area > parcelAreaFrom && 
		item.area < parcelAreaTo &&
		item.constructed_area >= builtAreaFrom && 
		item.constructed_area <= builtAreaTo
	)

	const parcelsLayer = parcelsData &&
			new PolygonLayer({
				id: 'parcels-layer',
				data: filterParcelData,
				pickable: true,
				getLineWidth: 1,
				getLineColor: (d: any) => [126, 126, 132, 180],
				highlightColor: [172, 208, 56, 50],
				autoHighlight: true,
				getPolygon: (d: any) => d.geometry.coordinates[0],
				getFillColor: (d: any) => 
					d.id === parcelId ? 
					[126, 126, 132, 255] :
					d.id in parcelsProperties ? 
					[172, 208, 56, 50] : 
					d.constructed_area === 0 ?
					[126, 126, 132, 155] :
					[126, 126, 132, 155],
				updateTriggers: {
					"getFillColor": [
						parcelAreaFrom, parcelAreaTo, 
						builtAreaFrom, builtAreaTo, 
						parcelId
					], 
					"getLineColor": [
						parcelAreaFrom, parcelAreaTo, 
						builtAreaFrom, builtAreaTo, 
						parcelId
					]},
				onClick: onClick,
				parameters: { depthTest: false },
				visible: activeLots
			});
	return (
		<ParcelsContext.Provider value={{ parcelsLayer }}>
			{children}
		</ParcelsContext.Provider>
	)
}

ParcelsContext.displayName = "ParcelsContext";