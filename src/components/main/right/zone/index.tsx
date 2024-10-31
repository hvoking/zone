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
			<div className="zone">
				<div>
					<div className="zone-title">{zone}</div>
					<div className="subtitle-style">zone</div>
				</div>
				<div>
					<div className="zone-title">{height ? height : "Free"}<span style={{fontSize: "0.8em"}}>{height ? "m" : ""}</span></div>
					<div className="subtitle-style">height</div>
				</div>
				<div>
					<div className="zone-title">{occupancyRate * 100}<span style={{fontSize: "0.8em"}}>%</span></div>
					<div className="subtitle-style">o.r.</div>
				</div>
				<div>
					<div className="zone-title">{floorAreaRatio}</div>
					<div className="subtitle-style">f.a.r.</div>
				</div>
			</div>
		</div>
	)
}

Zone.displayName="Zone";