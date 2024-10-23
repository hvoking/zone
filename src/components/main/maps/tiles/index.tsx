// React imports
import { useState, useEffect } from 'react';
// Context imports
import { useStyles } from '../../../context/maps/styles';

// Third party imports
import { Source, Layer } from 'react-map-gl';

export const Tiles = () => {
	const { fetchData } = useStyles();
	const [ styleData, setStyleData ] = useState<any[]>([]);

	const tilesUrl = `
    	${process.env.REACT_APP_API_URL}
    	/tiles
    	?table_schema=layers
    	&table_name=parcels
    	&x={x}
    	&y={y}
    	&z={z}
    `.replace(/\s/g, '');

    useEffect(() => {
    	const loadData = async () => {
			const data = await fetchData('parcels');
			setStyleData(data);
		}
		loadData();
	}, []);

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