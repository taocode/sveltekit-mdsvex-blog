import { error } from '@sveltejs/kit';

export const prerender = true;

/** @type {import('$types').LayoutLoad} */
export async function load({ url, fetch }) {
	const post = await fetch(`${url.pathname}.json`).then(res => res.json());
	
	if (!post || !post.published) {
		throw error(404, 'Post could not be found');
	}

	return {
		post
	};
}
