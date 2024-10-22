// Layer imports
import { useEnvelop } from '../../../context/layers/envelop';
import { useBuildingLayer } from '../../../context/layers/building';
import { useCurves } from '../../../context/layers/curves';
import { useDrain } from '../../../context/layers/drain';

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
	const { envelopLayer, envelopLinesLayer } = useEnvelop();
	const { buildingLayer } = useBuildingLayer();
	const { curvesLayer } = useCurves();
	const { drainLayer } = useDrain();

	const layers = [ 
		curvesLayer,
		drainLayer,
		buildingLayer,
		envelopLayer,
		envelopLinesLayer,
	];

	return (
		<DeckGLOverlay layers={layers}/>
	)
}

Layers.displayName="Layers";