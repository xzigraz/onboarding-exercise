export const getCurrentStep = (pathName: string) => {
	const paths = pathName.split("/");
	const lastPath = Number(paths[paths.length - 1]);

	switch(lastPath) {
		case 2:
			return 2;
		case 3:
			return 3;
		case 4:
			return 4;
		default: 
			return 1;
	}
}