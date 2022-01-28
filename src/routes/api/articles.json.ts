import type { ArticleType } from '../../types/Article';

type ArticleGetReturnData = {
	status: number;
	body: ArticleType[];
};

export const get = async (): Promise<ArticleGetReturnData> => {
	const allArticleData = import.meta.glob('../articles/*.md');
	const iterableArticleData = Object.entries(allArticleData);

	const allArticles = await Promise.all(
		iterableArticleData.map(async ([path, resolver]) => {
			const { metadata } = await resolver();
			const articlePath = path.slice(2, -3);

			return {
				meta: metadata,
				path: articlePath
			};
		})
	);

	const sortedArticles = allArticles.sort((a, b) => {
		return +new Date(b.meta.date) - +new Date(a.meta.date);
	});

	return { status: 200, body: sortedArticles };
};
