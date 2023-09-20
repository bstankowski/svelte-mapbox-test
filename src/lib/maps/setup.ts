import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl, { Map, NavigationControl } from 'mapbox-gl';
import { PUBLIC_MAPBOX_API_KEY } from '$env/static/public';

function add3dBuildings(map: Map) {
	const layers = map.getStyle().layers;
	const labelLayerId = layers.find(
		(layer) => layer.type === 'symbol' && layer.layout?.['text-field']
	)?.id;

	// The 'building' layer in the Mapbox Streets
	// vector tileset contains building height data
	// from OpenStreetMap.
	map.addLayer(
		{
			id: 'add-3d-buildings',
			source: 'composite',
			'source-layer': 'building',
			filter: ['==', 'extrude', 'true'],
			type: 'fill-extrusion',
			minzoom: 15,
			paint: {
				'fill-extrusion-color': '#ccc',

				// Use an 'interpolate' expression to
				// add a smooth transition effect to
				// the buildings as the user zooms in.
				'fill-extrusion-height': [
					'interpolate',
					['linear'],
					['zoom'],
					15,
					0,
					15.05,
					['get', 'height']
				],
				'fill-extrusion-base': [
					'interpolate',
					['linear'],
					['zoom'],
					15,
					0,
					15.05,
					['get', 'min_height']
				],
				'fill-extrusion-opacity': 0.6
			}
		},
		labelLayerId
	);
}

function createGeocoder(options?: MapboxGeocoder.GeocoderOptions) {
	return new MapboxGeocoder({
		accessToken: PUBLIC_MAPBOX_API_KEY,
		mapboxgl,
		...options
	});
}

export const setupMapFeatures = (map: Map) => {
	map.addControl(createGeocoder());

	// Zoom and rotation controls
	map.addControl(new NavigationControl());

	map.addControl(
		new mapboxgl.GeolocateControl({
			positionOptions: {
				enableHighAccuracy: true
			},
			trackUserLocation: true,
			showUserHeading: true
		})
	);

	const clickMarker = new mapboxgl.Marker();
	map.on('click', (ev) => {
		console.log('ev', ev);
		clickMarker.setLngLat([ev.lngLat.lng, ev.lngLat.lat]).addTo(map);
	});

	map.on('style.load', () => {
		if (map.getStyle().name === 'Mapbox Streets') {
			add3dBuildings(map);
		}
	});
};

// create the popup
// const popup = new mapboxgl.Popup({ offset: 25 }).setText(
// 	'Text content'
// );
// create DOM element for the marker
// const el = document.createElement('div');
// el.id = 'marker';

// // create the marker
// new mapboxgl.Marker(el)
// .setLngLat(monument)
// .setPopup(popup) // sets a popup on this marker
// .addTo(map);
