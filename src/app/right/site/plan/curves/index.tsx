// React imports
import { useState, useEffect } from 'react';

// Context imports
import { useTrimApi } from 'context/api/trim';
import { useSiteApi } from 'context/api/site';

export const Curves = ({ path }: any) => {
	const { fetchData } = useTrimApi();
	const { envelopData } = useSiteApi();

	const [ curvesData, setCurvesData ] = useState<any>(null);

	const tableSchema = "ambiental";
	const tableName = "blumenau_curvas";
	const tableColumn = "elevation";

    useEffect(() => {
    	const loadData = async () => {
			const data = await fetchData(envelopData, tableSchema, tableName, tableColumn);
			setCurvesData(data);
		}
		envelopData && loadData();
	}, [ envelopData ]);

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