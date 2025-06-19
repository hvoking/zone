export const LayerSelector = ({ setActiveLayer, activeLayer, name }: any) => {
	const onChange = () => setActiveLayer((prev: any) => !prev);

	return (
		<div className="selectors-item" onClick={onChange}>	
			<label style={{color: activeLayer ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.4)"}}>
				{name}
			</label>
			<label className="switch">
			  <input type="checkbox" onChange={onChange} checked={activeLayer}/>
			  <span className="slider round"/>
			</label>
		</div>
	)
}

LayerSelector.displayName="LayerSelector";