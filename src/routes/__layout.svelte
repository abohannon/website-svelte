<script>
	import '../app.css';

	let navItems = [
		{
			title: 'Home',
			path: '/'
		},
		{
			title: 'Articles',
			path: '/'
		},
		{
			title: 'Github',
			path: 'https://github.com/abohannon'
		},
		{
			title: 'LinkedIn',
			path: 'https://www.linkedin.com/in/adambohannon/'
		},
		{
			title: 'Twitter',
			path: 'https://twitter.com/abohannon'
		}
	];
</script>

<nav class="container mx-auto py-6">
	<div class="flex flex-col">
		<h1 class="text-3xl font-bold mb-4">Adam Bohannon</h1>
		<div class="flex">
			{#each navItems as item}
				<a class="mr-6 hover:underline" href={item.path}>{item.title}</a>
			{/each}
		</div>
	</div>
</nav>

<main class="container mx-auto">
	<slot />
</main>
