// App imports
import './styles.scss';

// Context imports
import { useGeo } from '../../../../context/filters/geo';

export const BasemapsSelectors = () => {
	const { basemap, setBasemap } = useGeo();

	const onClick = () => {
		basemap === "mapbox://styles/hvoking/clrwzn1jo015q01nl53664m2c" ?
		setBasemap("mapbox://styles/mapbox/satellite-v9") :
		setBasemap("mapbox://styles/hvoking/clrwzn1jo015q01nl53664m2c")
	}

	return (
		<div className="basemaps-wrapper">
			<img 
				className="basemaps-image"
				src={process.env.PUBLIC_URL + "/static/components/maps/globe.svg"}
				alt="globe"
				onClick={onClick}
			/>
		</div>
	)
}

BasemapsSelectors.displayName="BasemapsSelectors";