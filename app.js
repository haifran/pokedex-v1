const pokedex = document.getElementById("pokedex");

const pokeCache = {};

const fetchPokemon = async () => {
  const url = `https://pokeapi.co/api/v2/pokemon/?limit=151`;
  const res = await fetch(url);
  const data = await res.json();
  const pokemon = data.results.map((result, index) => ({
    name: result.name,
    apiURL: result.url,
    id: index + 1,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      index + 1
    }.png`,
  }));
  displayPokemon(pokemon);
};

const displayPokemon = (pokemon) => {
  console.log(pokemon);
  const pokemonHTMLString = pokemon
    .map(
      (pokemon) => `
  <li class="card" onclick="selectPokemon(${pokemon.id})">
    <img class="card-image" src="${pokemon.image}"/>
    <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
  </li>`
    )
    .join("");
  pokedex.innerHTML = pokemonHTMLString;
};

const selectPokemon = async (id) => {
  if (!pokeCache[id]) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    pokeCache[id] = pokemon;
    displayPopup(pokemon);
  }
  displayPopup(pokeCache[id]);
};

const displayPopup = (pokemon) => {
  const type = pokemon.types.map((type) => type.type.name).join(", ");
  const image = pokemon.sprites["front_default"];
  const htmlString = `
  <div class="popup">
  <button id="closeBtn" onclick="closePopup()">Close</button>
    <div class="card">
      <img class="card-image" src="${image}"/>
      <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
      <p class="card-subtitle"><small>Type: </small>${type}
    </div>
  </div>
  `;
  pokedex.innerHTML = htmlString + pokedex.innerHTML;
  console.log(htmlString);
};

const closePopup = () => {
  const popup = document.querySelector(".popup");
  popup.parentElement.removeChild(popup);
};

fetchPokemon();
