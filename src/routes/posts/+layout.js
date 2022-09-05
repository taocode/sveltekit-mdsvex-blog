import { error } from '@sveltejs/kit';

/**
 * @type {import('@sveltejs/kit').LayoutLoad}
 */
export async function load({ url, fetch }) {
	const post = await fetch(`${url.pathname}.json`).then(res => res.json());

	if (!post || !post.published) {
		throw error(404, 'Post could not be found');
	}

	return {
		post
	};
}
