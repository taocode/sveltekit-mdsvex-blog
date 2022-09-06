import { error } from '@sveltejs/kit';
import { slugFromPath } from '$lib/util';

export const prerender = true

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const modules = import.meta.glob('./../posts/**/*.{md,svx,svelte.md}');

	const postPromises = [];

	for (let [path, resolver] of Object.entries(modules)) {
		const slug = slugFromPath(path);
		const promise = resolver().then((post) => ({
			slug,
			...post.metadata
		}));

		postPromises.push(promise);
	}

	const posts = await Promise.all(postPromises);
	const publishedPosts = posts.filter((post) => post.published);

	publishedPosts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

	return new Response(JSON.stringify(publishedPosts));
}
