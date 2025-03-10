// APIs
const GITHUB_REPO_URL = "https://api.github.com/users/CKAY-9/repos";
const GITHUB_USER_URL = "https://api.github.com/users/CKAY-9";

// DOM Elements
const projects = document.getElementById("projects");
const sortOptions = document.getElementById("sortingOptions");
const username = document.getElementById("gitUsername");
const icon = document.getElementById("gitIcon");

let currentSort = "pushed";

const fetchReposFromGithub = async () => {
	projects.innerHTML = "<h2>Loading...</h2>";

	const repo_response = await fetch(GITHUB_REPO_URL + "?sort=" + currentSort);
	const repo_json = await repo_response.json();

	projects.innerHTML = "";


	let currDelay = 0;
	for (const repo of repo_json) {
		if (repo.private) continue;

		let license = repo.license;
		let description = repo.description;
		let topLang = repo.language;

		if (license === null) {
			license = "None";
		} else {
			license = repo.license.name;
		}

		if (description === null) {
			description = "No description provided.";
		}

		projects.innerHTML += `
            <div class="project" style="animation-delay: ${currDelay * 100}ms">
                <h2 class="repoName">${repo.name}</h2>
                <span>${description}</span>
                ${topLang === null ? "" : "<span>Written in " + topLang + "</span>"}
                <span>License: ${license}</span>
                <a href="${repo.html_url}">View on Github</a>
            </div>
        `

		currDelay++;
	}
}

const fetchUserFromGithub = async () => {
	const user_response = await fetch(GITHUB_USER_URL);
	const user_json = await user_response.json();

	console.log(user_json);

	username.innerText = user_json.login;
	icon.src = user_json.avatar_url;
}

sortOptions.onchange = async (ev) => {
	currentSort = ev.target.value;
	await fetchReposFromGithub();
}

window.onload = async (ev) => {
	await fetchUserFromGithub();
	await fetchReposFromGithub();
}
