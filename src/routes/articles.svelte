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

<h1 class="text-3xl mb-6">Articles</h1>
<ul>
	{#each articles as article}
		<li class="mb-2">
			<h2>
				<a href={article.path}>
					{article.meta.title}
				</a>
			</h2>
			<p class="italic">
				Published {new Date(article.meta.date).toDateString()}
			</p>
		</li>
	{/each}
</ul>
