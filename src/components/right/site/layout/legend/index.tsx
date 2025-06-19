// Context import
import { useSiteApi } from '../../../../../context/api/site';

export const Legend = ({ innerHeight }: any) => {
	const { lotData } = useSiteApi();
	const parcelArea = lotData ? lotData.parcel_area : "";

	return (
		<text
			x={0}
			y={innerHeight}
			fill="rgba(255, 255, 255, 0.6)"
			fontSize="0.8em"
			alignmentBaseline="after-edge"
		>
			area: {parcelArea} m²
		</text>
	)
}

Legend.displayName="Legend";