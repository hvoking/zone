// App imports
import { LayerSelector } from './layers';
import './styles.scss';

// Context imports
import { useVisibility } from '../../../../context/filters/visibility';

export const Selectors = () => {
	const { 
		activeCurves, setActiveCurves, 
		activeDrain, setActiveDrain,
		activeBuildings, setActiveBuildings,
	} = useVisibility();

	return (
		<div className="selectors-wrapper">
			<div>Layers</div>
			<LayerSelector
				activeLayer={activeBuildings}
				setActiveLayer={setActiveBuildings}
				name={"parcels"}
			/>
			<LayerSelector
				activeLayer={activeCurves}
				setActiveLayer={setActiveCurves}
				name={"curves"}
			/>
			<LayerSelector
				activeLayer={activeDrain}
				setActiveLayer={setActiveDrain}
				name={"drain"}
			/>
		</div>
	)
}

Selectors.displayName="Selectors";