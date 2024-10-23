// React imports
import { useState, useEffect } from 'react';
// Context imports
import { useStyles } from '../../../context/maps/styles';

// Third party imports
import { Source, Layer } from 'react-map-gl';

export const Tiles = () => {
	const { fetchData, getTilesUrl } = useStyles();
	const [ styleData, setStyleData ] = useState<any[]>([]);
	const styleName = "parcels"

    useEffect(() => {
    	const loadData = async () => {
			const data = await fetchData(styleName);
			setStyleData(data);
		}
		loadData();
	}, []);

	const tilesUrl = getTilesUrl("layers", styleName)

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