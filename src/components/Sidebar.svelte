<script lang="ts">
	export let data: {
		lng: string;
		lat: string;
		zoom: string;
	};
</script>

<aside>
	<dl>
		<dt>Longitude:</dt>
		<dd>{data.lng}</dd>
		<dt>Latitude:</dt>
		<dd>{data.lat}</dd>
		<dt>Zoom:</dt>
		<dd>{data.zoom}</dd>
	</dl>

	<slot />
</aside>

<style>
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
</style>
