// Context imports
import { useParcelCurvesApi } from '../../../../../context/api/geom/curves/parcel';

export const Curves = ({ path }: any) => {
	const { parcelCurvesData } = useParcelCurvesApi();

	if (!parcelCurvesData) return <></>

	return (
		<>
			{parcelCurvesData.map((item: any, index: any) => 
				<path
					key={index}
					fill="transparent"
					stroke={`rgba(255, 255, 255, 0.2)`}
					strokeWidth={1}
					className="feature" 
					d={`${path(item[1])}`}
				/>
			)}
		</>
	)
}

Curves.displayName="Curves";