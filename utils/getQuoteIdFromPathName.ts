export const getQuoteIdFromPathName = (pathName: string): string => {
	const paths = pathName.split("/");

	return paths[paths.length - 2];
}