// Layer imports
import { useEnvelop } from '../../../context/maps/layers/envelop';
import { useDrain } from '../../../context/maps/layers/drain';
import { useCurves } from '../../../context/maps/layers/curves';
import { useCircle } from '../../../context/maps/layers/circle';
import { useBuildingLayer } from '../../../context/maps/layers/building';

// Third-party imports
import { useControl } from 'react-map-gl';
import { MapboxOverlay } from '@deck.gl/mapbox/typed';
import type { DeckProps } from '@deck.gl/core/typed';

const DeckGLOverlay = (props: DeckProps) => {
  const deck = useControl<any>(() => new MapboxOverlay(props));
  deck.setProps(props);
  return null;
}

export const Layers = () => {
	const { circleLayer } = useCircle();
	const { curvesLayer } = useCurves();
	const { drainLayer } = useDrain();
	const { envelopLayer, envelopLinesLayer } = useEnvelop();
	const { buildingLayer } = useBuildingLayer();

	const layers = [ 
		circleLayer, 
		drainLayer,
		curvesLayer,
		buildingLayer,
		envelopLayer,
		envelopLinesLayer,
	];

	return (
		<DeckGLOverlay layers={layers}/>
	)
}

Layers.displayName="Layers";