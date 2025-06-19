// App imports
import { ReCenter } from './reCenter';
import './styles.scss';

// Context imports
import { useGeo } from 'context/geo';

// Third party imports
import { NavigationControl } from 'react-map-gl/mapbox';

export const Controllers = () => {
	const { viewport, setViewport, placeCoordinates } = useGeo();

	return (
		<>
			<NavigationControl/>
			<ReCenter
				viewport={viewport} 
				setViewport={setViewport} 
				placeCoordinates={placeCoordinates}
			/>
		</>
	)
}

Controllers.displayName="Controllers";