export const slugFromPath = (path) => {
	const pathParts = path.split('/')
	return pathParts[pathParts.length-2] ?? null;
}