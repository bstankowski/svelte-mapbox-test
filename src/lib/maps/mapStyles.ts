import type { MapStyleOption } from '$lib/types';

export const mapStyles: MapStyleOption[] = [
	{ label: 'Streets', value: 'mapbox://styles/mapbox/streets-v12' },
	{ label: 'Outdoors', value: 'mapbox://styles/mapbox/outdoors-v12' },
	{ label: 'Light', value: 'mapbox://styles/mapbox/light-v11' },
	{ label: 'Dark ', value: 'mapbox://styles/mapbox/dark-v11' },
	{
		label: 'Satellite Streets',
		value: 'mapbox://styles/mapbox/satellite-streets-v12'
	},
	{
		label: 'Navigation Day',
		value: 'mapbox://styles/mapbox/navigation-day-v1'
	},
	{
		label: 'Navitation Night',
		value: 'mapbox://styles/mapbox/navigation-night-v1'
	}
];
