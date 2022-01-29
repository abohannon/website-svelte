import remarkImages from 'remark-images';

export default {
	extensions: ['.svelte.md', '.md', '.svx'],
	remarkPlugins: [remarkImages],
	layout: 'src/lib/ArticleLayout.svelte'
};
