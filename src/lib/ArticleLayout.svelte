<script context="module">
	import a from '$lib/ArticleLink.svelte';
	export { a };
</script>

<script>
	export let title;
	export let date;
	export let tags;
</script>

<div class="mb-6 pb-6 border-b">
	<h1>{title}</h1>
	<p>{new Date(date).toDateString()}</p>
	{#each tags as tag}
		<span class="mr-2 text-sm font-semibold">{tag}</span>
	{/each}
</div>
<slot />
