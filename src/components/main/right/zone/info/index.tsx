export const Info = ({zone, height, occupancyRate, floorAreaRatio}: any) => {
	return (
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
	)
}

Info.displayName="Info";