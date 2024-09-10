// Context imports
import { useGoogleReverseApi } from '../../../context/api/google/reverse';
import './styles.scss';

export const Location = () => {
	const { currentAddress } = useGoogleReverseApi();
	
	return (
		<div className="location-wrapper">
				<img 
					style={{width: "10px"}}
					src={process.env.PUBLIC_URL + "/static/components/maps/marker.svg"} 
					alt="pin-location"
			     />
				<div>{currentAddress}</div>
		</div>
	)
}