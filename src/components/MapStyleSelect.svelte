<script lang="ts">
	import { mapStyles } from './mapStyles';
	export let style: StylePropertyMap;

	console.log('style', style);
</script>

<select class="map-style-select" bind:value={style} on:change>
	{#each mapStyles as style (style.value)}
		<option value={style.value}>
			{style.label}
		</option>
	{/each}
</select>

<style>
	.map-style-select {
		min-width: 10rem;
		margin-bottom: 0.5rem;
		background-color: rgba(255, 255, 255, 0.9);
	}
</style>
