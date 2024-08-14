const pokemonElement = document.getElementById("pokemon");
const pokemonID = window.location.search.split("=")[1];

const typeToColor = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
}

const fetchPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const request = await fetch(url);
    const json = await request.json();
    displayPokeman(json);
}

const displayPokeman = (pokeman) => {
    document.title = `${pokeman.name.charAt(0).toUpperCase() + pokeman.name.slice(1)} - Ultimate Pokedex`;
    pokemonElement.innerHTML = `
        <img class="pokemon-image" src="${pokeman.sprites.front_default}" />
        <h1 class="pokemon-name">${pokeman.name}</h1>
        <div class="pokemon-data">
            <section class="card" style="animation: none !important; transition: none !important; background-color: var(--card) !important">
                <h2 style="margin: 0">Sprite(s)</h2>
                <div class="pokemon-sprites">
                    ${Object.keys(pokeman.sprites).map((sprite) => {
                        if (sprite == "other" || sprite == "versions" || pokeman.sprites[sprite] == null) {
                            return;
                        }

                        return `<img src="${pokeman.sprites[sprite]}" class="pokemon-sprite" />`;
                    }).join('')}
                </div>
            </section>
            <section class="card" style="animation: none !important; transition: none !important; background-color: var(--card) !important">
                <h2 style="margin: 0">Type(s)</h2>
                <div class="card-types">
                    ${pokeman.types.map((type) => `<span class="card-type" style="color: ${typeToColor[type.type.name]}">${type.type.name}</span>`).join('')}
                </div>
            </section>
            <section class="card" style="animation: none !important; transition: none !important; background-color: var(--card) !important">
                <h2 style="margin: 0">Data coming soon.</h2>
            </section>
        </div>
    `;
};

window.onload = async () => {
    await fetchPokemon(pokemonID);
}