<script>
	let navItems = [
		{
			title: 'Articles',
			path: '/articles'
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

<nav class="py-6">
	<div class="flex flex-col">
		<h1 class="text-3xl font-bold mb-4"><a class="no-underline" href="/">Adam Bohannon</a></h1>
		<div class="flex">
			{#each navItems as item}
				<a class="mr-6 no-underline hover:underline" href={item.path}>{item.title}</a>
			{/each}
		</div>
	</div>
</nav>
