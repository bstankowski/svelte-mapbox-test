import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl, { Map, NavigationControl } from 'mapbox-gl';
import { PUBLIC_MAPBOX_API_KEY } from '$env/static/public';
import addEarthquakesClusters from './earthquakes';
import add3dBuildings from './buildings3d';
import addGeoLocator from './location';

function createGeocoder(options?: MapboxGeocoder.GeocoderOptions) {
	return new MapboxGeocoder({
		accessToken: PUBLIC_MAPBOX_API_KEY,
		mapboxgl,
		zoom: 15,
		...options
	});
}

export const setupMapFeatures = (map: Map) => {
	map.addControl(createGeocoder());
	map.addControl(new NavigationControl());
	addGeoLocator(map);

	map.on('style.load', () => {
		add3dBuildings(map);
		addEarthquakesClusters(map);
	});
};
