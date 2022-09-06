export const prerender = true;

/**  @type {import('$types').PageLoad} */
export async function load({ fetch }) {
	// Use a `limit` querystring parameter to fetch a limited number of posts
	// e.g. fetch('posts.json?limit=5') for 5 most recent posts
	const posts = await fetch('/posts.json').then((res) => res.json());

	return {
		posts
	};
}
