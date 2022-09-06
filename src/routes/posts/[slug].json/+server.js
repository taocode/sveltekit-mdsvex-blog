import { error } from '@sveltejs/kit';
import { slugFromPath } from '$lib/util';

export const prerender = true;

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	const modules = import.meta.glob(`../**/*.{md,svx,svelte.md}`);

	let match;
	for (const [path, resolver] of Object.entries(modules)) {
		if (slugFromPath(path) === params.slug) {
			match = [path, resolver];
			break;
		}
	}

	if (!match) {
		throw error(404);
	}

	const post = await match[1]();

	return new Response(JSON.stringify(
		post.metadata
	));
}
