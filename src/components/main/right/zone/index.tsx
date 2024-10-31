// App imports
import { Header } from './header';
import { Info } from './info';

// Context imports
import { useMask } from '../../../context/maps/mask';
import './styles.scss';

export const Zone = () => {
	const { maskProperties } = useMask();

	const data = maskProperties.map((item: any) => item.properties);

	const getUniqueZones = (data: any) => {
	  const uniqueZones = data.reduce((acc: any, item: any) => {
	    if (!acc.some((zone: any) => zone.zone === item.zone)) {
	    	if (item.zone) {
				acc.push({
					zone: item.zone,
					height: item.height,
					occupancy_rate: item.occupancy_rate,
					far: item.plot_ratio
				});
			}
	    }
	    return acc;
	  }, []);

	  return uniqueZones;
	};

	const arrayOfZones = getUniqueZones(data);
		
	return (
		<div className="zone-wrapper">
			<div className="title-wrapper-style">
				Parcel regulations
			</div>
			<Header/>
			{arrayOfZones.map((item: any) => {
				return (
					<Info 
						zone={item.zone} 
						height={item.height} 
						occupancyRate={item.occupancy_rate} 
						floorAreaRatio={item.far}
					/>
				)
			})}
				
		</div>
	)
}

Zone.displayName="Zone";