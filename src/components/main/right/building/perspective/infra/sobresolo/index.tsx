export const Sobresolo = ({ xLeft, yLeft, xRight, yRight, xBottom, yBottom, xProjected, yProjected, floorHeight }: any) => {
	return (
		<polygon 
			fill="#F2F2F2"
			points={`
				${xBottom}, ${yBottom} 
				${xRight}, ${yRight} 
				${xRight}, ${yRight - floorHeight} 
				${xProjected}, ${yProjected - floorHeight} 
				${xLeft}, ${yLeft - floorHeight}
				${xLeft}, ${yLeft} 
			`}
		/>
	)
}

Sobresolo.displayName="Sobresolo"