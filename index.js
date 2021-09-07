import fetch from "node-fetch";
import { base64encode, base64decode } from "nodejs-base64";

async function requestPosts() {
	const response = await fetch(
		"https://your-web-site.com.br/wp-json/wp/v2/procedimentos?per_page=100",
		{
			mode: "cors",
			method: "GET",
			headers: {
				Accept: "application/json",
			},
		}
	);

	const body = await response.json();
	return body;
}

async function getContentPosts() {
	const content = await requestPosts();

	let postsPublish = [];

	content.forEach((content) => {
		if (content.status == "publish") {
			let item = new Object();
			// item.id = content.id;
			// item.date = content.date;
			// item.slug = content.slug;
			item.title = content.title.rendered;
			item.content = content.content.rendered;
			item.status = content.status;
			postsPublish.push(item);

			// console.log(item);
		}
	});

	postsPublish.forEach(async (postsPublish) => {
		await createPostTest(postsPublish);
	});
}

getContentPosts();
//robotCreator

async function createPostTest(content) {
	const response = await fetch(
		"https://example.com.br/wp-json/wp/v2/posts",
		{
			mode: "cors",
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json;charset=UTF-8",
				Authorization: "Basic " + base64encode("user:password"),
			},

			// body: JSON.stringify({
			// 	"title": "Post Example",
			// 	"content": "Hello World",
			// 	"excerpt": "example",
			// 	"status": "publish"
			// }),
			body: JSON.stringify(content),
		}
	);

	const body = await response.json();
	console.log(body);
}

// createPostTest();
