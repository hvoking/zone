// Context imports
import { useMask } from '../../../context/maps/mask';
import { useParcelDimensions } from '../../../context/dimensions/parcel';
import { useBuiltDimensions } from '../../../context/dimensions/built';

// Third party imports
import { Source, Layer } from 'react-map-gl';

const getColor = (item: any, opacity: any) => {
	const { r, g, b, a } = item;
	const color = `rgba(${r * 255}, ${g * 255}, ${b * 255}, ${opacity})`;
	return color
}

export const Mask = () => {
	const { maskProperties } = useMask();
	const { parcelAreaFrom, parcelAreaTo } = useParcelDimensions();
	const { builtAreaFrom, builtAreaTo } = useBuiltDimensions();

	if (!maskProperties) return <></>

	// Filter by fill color
	const features = maskProperties.filter((item: any) => {
        const stringList = Object.keys(item.layer.paint);
        return stringList.includes("fill-color");
    });

	const updatedFeatures = features.map((item: any) => {
		const area = item.properties.area_carto;

		const constructedArea = item.properties.constructed_area
		const constructedAreaList = constructedArea ? constructedArea.replace(/[{}]/g, '').split(',') : [];
		const sumConstructedArea = constructedAreaList.reduce((total: any, num: any) => total + parseFloat(num), 0);
		
		const opacity = 
			area > parcelAreaFrom && 
			area < parcelAreaTo &&
			sumConstructedArea >= builtAreaFrom && 
			sumConstructedArea <= builtAreaTo
			? 1 : 0;

		const currentColor = getColor(item.layer.paint["fill-color"], opacity);

		return ({
			type: "Feature",
			geometry: item.geometry,
			properties: {
				...item.properties, 
				'fill-color': currentColor
			}
		})
	});
		
	const geoJsonData: any = {
        "type": "FeatureCollection",
        "features": updatedFeatures
    };

	return (
		<Source id="polygon-data" type="geojson" data={geoJsonData}>
	        <Layer
	          id="extruded-polygons"
	          type="fill-extrusion"
	          paint={{
	            'fill-extrusion-color': ['get', 'fill-color'],
	            'fill-extrusion-height': ['get', 'geometria'],
	            'fill-extrusion-base': 0,
	            'fill-extrusion-opacity': 0.5
	          }}
	        />
	      </Source>
	)
}

Mask.displayName="Mask"