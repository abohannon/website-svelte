<script>
	let navItems = [
		{
			title: 'Github',
			path: 'https://github.com/abohannon'
		},
		{
			title: 'LinkedIn',
			path: 'https://www.linkedin.com/in/adambohannon/'
		},
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
