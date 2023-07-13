// APIs
const GITHUB_REPO_URL = "https://api.github.com/users/CKAY-9/repos"

// DOM Elements
const projects = document.getElementById("projects");

window.onload = async (ev) => {
    const repo_response = await fetch(GITHUB_REPO_URL);
    const repo_json = await repo_response.json();

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
            <div class="project">
                <h2>${repo.name}</h2>
                <span>${description}</span>
                ${topLang === null ? "" : "<span>Written in " + topLang + "</span>"}
                <span>License: ${license}</span>
                <a href="${repo.html_url}">View on Github</a>
            </div>
        `
    }
}
