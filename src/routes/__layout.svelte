<script>
	import Nav from '$lib/Nav.svelte';
	import Footer from '$lib/Footer.svelte';
	import '../app.css';
</script>

<div class="container mx-auto">
	<Nav />
	<main class="mt-8">
		<slot />
	</main>
	<Footer />
</div>
