<script lang="ts">
	import { Map } from 'mapbox-gl';
	import '../../node_modules/mapbox-gl/dist/mapbox-gl.css';
	import '../../node_modules/@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
	import { onMount, onDestroy } from 'svelte';
	import { PUBLIC_MAPBOX_API_KEY } from '$env/static/public';
	import { setupMapFeatures } from '$lib/maps/setup';
	import MapStyleSelect from '$components/MapStyleSelect.svelte';
	import { mapStyles } from '$components/mapStyles';

	let map: Map;
	let mapContainer: HTMLDivElement;
	let lng: number, lat: number, zoom: number;

	lng = 21.0427;
	lat = 52.2342;
	zoom = 8;

	$: fixedLat = lat.toFixed(4);
	$: fixedLng = lng.toFixed(4);
	$: fixedZoom = zoom.toFixed(2);

	function updateData() {
		zoom = map.getZoom();
		lng = map.getCenter().lng;
		lat = map.getCenter().lat;
	}

	function handleChangeStyle(event: { currentTarget: HTMLSelectElement }) {
		map.setStyle(event.currentTarget.value);
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
			updateData();
		});

		setupMapFeatures(map);
	});

	onDestroy(() => {
		map?.remove();
	});

	console.log('mapStyle', mapStyle);
</script>

<aside>
	<dl>
		<dt>Longitude:</dt>
		<dd>{fixedLng}</dd>
		<dt>Latitude:</dt>
		<dd>{fixedLat}</dd>
		<dt>Zoom:</dt>
		<dd>{fixedZoom}</dd>
	</dl>
	<MapStyleSelect style={mapStyle} on:change={handleChangeStyle} />
</aside>

<div class="map-wrap">
	<div class="map" bind:this={mapContainer} />
</div>

<style>
	.map {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	aside {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		margin: 1rem;
		padding: 1rem 1rem;

		background-color: rgba(35, 55, 75, 0.9);
		color: #fff;
		font-family: monospace;
		border-radius: 4px;
		text-align: left;
	}

	aside dl {
		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: 0.5rem;
		margin: 0;
	}

	aside dd {
		margin: 0 0 0.5rem;
	}
	/* 
	#marker {
		background-image: url('https://docs.mapbox.com/mapbox-gl-js/assets/washington-monument.jpg');
		background-size: cover;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		cursor: pointer;
	}

	.mapboxgl-popup {
		max-width: 200px;
	} */
</style>
