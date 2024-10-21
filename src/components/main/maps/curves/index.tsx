// Context imports
import { useParcelsCurvesApi } from '../../../context/api/geom/curves/parcels';

// Third party imports
import { Source, Layer, LayerProps } from 'react-map-gl';

export const Curves = () => {
    const { parcelsCurvesData } = useParcelsCurvesApi();

    if (!parcelsCurvesData) return <></>

    const curvesLayer: LayerProps = {
        id: 'curves-lines',
        type: 'line',
        source: 'curves',
        layout: {
            'line-cap': 'round',
            'line-join': 'round',
        },
        paint: {
            'line-color': "rgba(0, 255, 0, 0.8)",
            'line-width': ["/", ['get', 'elevation'], 100]
        }
    };

    const featureCollection = {
      type: "FeatureCollection",
      features: parcelsCurvesData.map((geometry: any) => ({
        type: "Feature",
        geometry: geometry[1],
        properties: {"elevation": geometry[0]}
      }))
    };

    return (
        <Source id="curves" type="geojson" data={featureCollection}>
            <Layer {...curvesLayer} />
        </Source>
    );
};

Curves.displayName = "Curves";