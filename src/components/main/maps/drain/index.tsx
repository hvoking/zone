// Context imports
import { useDrainApi } from '../../../context/api/geom/drain';

// Third party imports
import { Source, Layer, LayerProps } from 'react-map-gl';

export const Drain = () => {
    const { drainData } = useDrainApi();

    if (!drainData) return <></>

    const drainLayer: LayerProps = {
        id: 'drain-lines',
        type: 'line',
        source: 'drain',
        layout: {},
        paint: {
            'line-color': "rgba(33, 33, 255, 1)",
            'line-width': ['get', 'dimensions']
        }
    };

    const featureCollection = {
      type: "FeatureCollection",
      features: drainData.map((d: any) => ({
        type: "Feature",
        geometry: d.geometry,
        properties: {"dimensions": d.dimensions /  10}
      }))
    };

    return (
        <Source id="drain" type="geojson" data={featureCollection}>
            <Layer {...drainLayer} />
        </Source>
    );
};

Drain.displayName = "Drain";