import mapboxgl, { Map } from 'mapbox-gl';

export default function addGeoLocator(map: Map) {
	map.addControl(
		new mapboxgl.GeolocateControl({
			positionOptions: {
				enableHighAccuracy: true
			},
			trackUserLocation: true,
			showUserHeading: true
		})
	);
}
