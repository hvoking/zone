export const BackArrow = ({ setActiveSearch }: any) => {
	return (
		<svg 
			fill="rgba(255, 255, 255, 1)" 
			viewBox="0 0 20 24" 
			width="24"
			onClick={() => setActiveSearch(false)}
		>
			<path d="
				M21,
				11v1
				H5.64 l6.72,
				6.72 l-0.71,
				0.71 L3.72,
				11.5 l7.92-7.92 l0.71,
				0.71 L5.64,
				11H
				21z"
			/>
		</svg>
	)
}

BackArrow.displayName="BackArrow";