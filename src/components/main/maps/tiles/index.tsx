// Context imports
import { useStyles } from '../../../context/styles';

// Third party imports
import { Source, Layer } from 'react-map-gl';

export const Tiles = () => {
	const { styleData, styleName } = useStyles();

	const tempUrl = `
    	${process.env.REACT_APP_API_URL}
    	/tiles
    	?table_schema=layers
    	&table_name=${styleName}
    	&x={x}
    	&y={y}
    	&z={z}
    `
	const url = tempUrl.replace(/\s/g, '');

	const layers = styleData.map((style: any, index: number) => {
		return (
			<Layer key={index} {...style}/>
		)
	});

	return (
		<Source 
			id="raster-style" 
			type="vector" 
			tiles={[ url ]}
		>
			{layers}
		</Source>
	)
}

Tiles.displayName="Tiles"