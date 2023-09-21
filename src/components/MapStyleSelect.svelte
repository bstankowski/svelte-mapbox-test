<script lang="ts">
	import { mapStyles } from '$lib/maps/mapStyles';
	export let style: StylePropertyMap;
</script>

<label for="map-style-select">Style</label>
<select id="map-style-select" bind:value={style} on:change>
	{#each mapStyles as style (style.value)}
		<option value={style.value}>
			{style.label}
		</option>
	{/each}
</select>
