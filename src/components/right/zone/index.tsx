// App imports
import { Header } from './header';
import { Info } from './info';

// Context imports
import { useSiteApi } from 'context/api/site';
import './styles.scss';

export const Zone = () => {
	const { zoneData } = useSiteApi();

	return (
		<div className="zone-wrapper">
			<div className="title-wrapper-style">
				Parcel regulations
			</div>
			<Header/>
			<Info 
				zone={zoneData.zone} 
				height={zoneData.height} 
				occupancyRate={zoneData.occupancy_rate} 
				floorAreaRatio={zoneData.plot_ratio}
			/>
				
		</div>
	)
}

Zone.displayName="Zone";