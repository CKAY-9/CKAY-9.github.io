const pokedex = document.getElementById("pokedex");

const pokeRange = [
    1, 150
];

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

const fetchPokemon = async () => {
    if (pokeRange[1] >= 900) return;
    for (let i = pokeRange[0]; i <= pokeRange[1]; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        const request = await fetch(url);
        const json = await request.json();
        displayPokeman(json);
    }
}

const displayPokeman = (pokeman) => {
    const card = document.createElement("a");
    card.href = `./pokemon.html?pokemon=${pokeman.id}`;
    card.classList.add("card");
    card.innerHTML = `
        <img class="card-image" src="${pokeman.sprites.front_default}" />
        <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
        <div class="card-types">
            ${pokeman.types.map((type) => `<span class="card-type" style="color: ${typeToColor[type.type.name]}">${type.type.name}</span>`).join('')}
        </div>
    `;

    pokedex.appendChild(card);
};

window.onscroll = async () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        pokeRange[0] += 150;
        pokeRange[1] += 150;
        await fetchPokemon();
    }
}

window.onload = async () => {
    await fetchPokemon();
}