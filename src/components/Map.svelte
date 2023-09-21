<script lang="ts">
	import '../../node_modules/mapbox-gl/dist/mapbox-gl.css';
	import '../../node_modules/@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
	import { Map } from 'mapbox-gl';
	import { onMount, onDestroy } from 'svelte';
	import { PUBLIC_MAPBOX_API_KEY } from '$env/static/public';
	import { setupMapFeatures } from '$lib/maps/setup';
	import MapStyleSelect from '$components/MapStyleSelect.svelte';
	import { mapStyles } from '$lib/maps/mapStyles';
	import Sidebar from '$components/Sidebar.svelte';

	let map: Map;
	let mapContainer: HTMLDivElement;
	let lng: number, lat: number, zoom: number;

	// Initial coords set to Warsaw
	lng = 21.0066;
	lat = 52.2315;
	zoom = 12;

	$: fixedLat = lat.toFixed(4);
	$: fixedLng = lng.toFixed(4);
	$: fixedZoom = zoom.toFixed(2);

	function updateCamera() {
		zoom = map.getZoom();
		lng = map.getCenter().lng;
		lat = map.getCenter().lat;
	}

	function handleChangeStyle(event: Event) {
		const target = event.target as HTMLSelectElement;
		map.setStyle(target.value);
	}

	const mapStyle = mapStyles[0];

	onMount(() => {
		map = new Map({
			container: mapContainer,
			accessToken: PUBLIC_MAPBOX_API_KEY,
			style: mapStyle.value,
			center: [lng, lat],
			zoom
		});

		map.on('move', () => {
			updateCamera();
		});

		setupMapFeatures(map);
	});

	onDestroy(() => {
		map?.remove();
	});
</script>

<Sidebar data={{ lng: fixedLng, lat: fixedLat, zoom: fixedZoom }}>
	<MapStyleSelect style={mapStyle} on:change={handleChangeStyle} />
</Sidebar>

<div class="map" bind:this={mapContainer} />

<style>
	.map {
		position: absolute;
		width: 100%;
		height: 100%;
	}
</style>
