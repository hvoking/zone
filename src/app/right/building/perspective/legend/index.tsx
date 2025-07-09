export const Legend = ({ item, xScale, yScale, apartmentFront, frontCount, iRight, jRight, frontOffset, iLeft, sideOffset, innerWidth, innerHeight }: any) => {
	return (
        <g transform={`translate(
			${-(iRight * xScale(sideOffset) + iLeft * xScale(frontOffset))}, 
			${jRight * xScale(frontCount * apartmentFront)}
		)`}>
            <text
            	x={-20}
            	y={innerHeight - yScale(item)}
            	alignmentBaseline="middle"
            	textAnchor="start"
            	fill="rgba(126, 126, 132, 1)"
            	fontSize="0.8em"
            >
            	{item}
            </text>
            <line
            	x1={0}
            	y1={innerHeight - yScale(item)}
            	x2={innerWidth - 20}
            	y2={innerHeight - yScale(item)}
            	stroke="rgba(126, 126, 132, 0.8)"
            	strokeWidth={0.6}
            	strokeDasharray="3 6"
            />
        </g>
	)
}

Legend.displayName="Legend";