<script context="module">
	export const load = async ({ fetch }) => {
		const response = await fetch('/api/articles.json');
		const articles = await response.json();

		return {
			props: {
				articles
			}
		};
	};
</script>

<script lang="ts">
	import type { ArticleType } from '../types/Article';

	export let articles: ArticleType[];
</script>

<svelte:head>
	<title>Adam Bohannon | Articles</title>
</svelte:head>

<ul class="divide-y divide-slate-200">
	{#each articles as article}
		<li class="mb-2 pb-2">
			<p class="italic">
				{new Date(article.meta.date).toDateString()}
			</p>
			<h4>
				<a href={article.path}>
					{article.meta.title}
				</a>
			</h4>
		</li>
	{/each}
</ul>
