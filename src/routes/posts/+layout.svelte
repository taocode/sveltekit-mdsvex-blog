<script>
	import PageHead from '$lib/components/PageHead.svelte';
	import ArticleTitle from '$lib/components/ArticleTitle.svelte';
	import ArticleMeta from '$lib/components/ArticleMeta.svelte';

	export const prerender = true;
	
	export let data;
	export let post = data.post;
</script>

<PageHead title={post.title} description={post.description} />

<ArticleTitle title={post.title} />
<ArticleMeta author={post.author} date={post.date} />

<slot />
