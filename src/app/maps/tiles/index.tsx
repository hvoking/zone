// React imports
import { useState, useEffect } from 'react';

// Context imports
import { useStyles } from 'context/maps/styles';

// Third party imports
import { Source, Layer } from 'react-map-gl/mapbox';

export const Tiles = () => {
	const { fetchData, getTilesUrl } = useStyles();
	const [ styleData, setStyleData ] = useState<any[]>([]);

	const tableName = "parcels"

    useEffect(() => {
    	const loadData = async () => {
			const data = await fetchData('', tableName);
			setStyleData(data);
		}
		loadData();
	}, []);

	const tilesUrl = getTilesUrl("layers", tableName)

	const layers = styleData.map((style: any, index: number) => {
		return (
			<Layer key={index} {...style}/>
		)
	});

	return (
		<Source 
			id="raster-style" 
			type="vector" 
			tiles={[ tilesUrl ]}
		>
			{layers}
		</Source>
	)
}

Tiles.displayName="Tiles"