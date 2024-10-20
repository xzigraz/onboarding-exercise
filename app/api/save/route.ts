export async function POST(request: Request) {
	if (!process.env.API_URL) {
		throw new Error("API_URL is not defined in environment variables.");
	}

	const formData = await request.json();

	if (!formData) {
		throw new Error("Invalid data. Required fields are missing.");
	}

	try {
		const res = await fetch(process.env.API_URL, {
			method: "POST",
			body: formData
		});
		const data = await res.json();
		return Response.json(data);
	} catch (error) {
		console.error(`Error during fetch: ${error}`);
		return Response.json({ error: 'An error occurred during the request' }, { status: 500 });
	}
}