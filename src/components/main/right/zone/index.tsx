// App imports
import { Info } from './info';

// Context imports
import { useZoneApi } from '../../../context/api/zone';
import './styles.scss';

export const Zone = () => {
	const { zoneData } = useZoneApi();

	if (!zoneData) return <></>
		
	const zone = zoneData.zone;
	const height = zoneData.height;
	const occupancyRate = zoneData.occupancy_rate;
	const floorAreaRatio = zoneData.far;

	return (
		<div className="zone-wrapper">
			<div className="title-wrapper-style">
				Parcel regulations
			</div>
			<Info zone={zone} height={height} occupancyRate={occupancyRate} floorAreaRatio={floorAreaRatio}/>
		</div>
	)
}

Zone.displayName="Zone";