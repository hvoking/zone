// Context imports
import { useCurvesApi } from '../../../../../context/api/curves';

export const Curves = ({ path }: any) => {
	const { curvesData } = useCurvesApi();

	if (!curvesData) return <></>

	return (
		<>
			{curvesData.map((item: any, index: any) => 
				<path
					key={index}
					fill="transparent"
					stroke={`rgba(255, 255, 255, 0.2)`}
					strokeWidth={1}
					className="feature" 
					d={`${path(item.geometry)}`}
				/>
			)}
		</>
	)
}

Curves.displayName="Curves";