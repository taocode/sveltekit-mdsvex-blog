// throw new Error("@migration task: Update +server.js (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");


// @migration task: Check imports
import { error } from '@sveltejs/kit';
import { slugFromPath } from '$lib/util';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const modules = import.meta.glob('./../posts/**/*.{md,svx,svelte.md}');

	const postPromises = [];
	const limit = Number(url.searchParams.get('limit') ?? Infinity);

	if (Number.isNaN(limit)) {
		throw error(400, 'invalid limit');
	}

	for (let [path, resolver] of Object.entries(modules)) {
		const slug = slugFromPath(path);
		const promise = resolver().then((post) => ({
			slug,
			...post.metadata
		}));

		postPromises.push(promise);
	}

	const posts = await Promise.all(postPromises);
	const publishedPosts = posts.filter((post) => post.published).slice(0, limit);

	publishedPosts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

	return new Response(JSON.stringify(publishedPosts.slice(0, limit)));
}
