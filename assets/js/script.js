const pokemonName = document.querySelector(".pokemon__name");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonImage = document.querySelector(".pokemon__image");

const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Loading...";
  pokemonNumber.innerHTML = "";

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = "block";
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    input.value = "";
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = "none";
    pokemonName.innerHTML = "Not found :c";
    pokemonNumber.innerHTML = "";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);

document.addEventListener("DOMContentLoaded", () => {
  const pokedexClose = document.querySelector(".pokedex-close");
  const pokedexOpen = document.querySelector(".pokedex-open");
  const pokemonContent = document.querySelector(".pokemon-content");
  const pokedexLogo = document.querySelector(".pokedex-logo");

  // abrir e fechar
  function setClosedState(save = true) {
    pokedexClose.style.display = "block";
    pokedexOpen.style.display = "none";
    pokemonContent.style.display = "none";

    if (save) localStorage.setItem("pokedexState", "closed");
  }

  function setOpenState(save = true) {
    pokedexClose.style.display = "none";
    pokedexOpen.style.display = "block";
    pokemonContent.style.display = "block";

    if (save) localStorage.setItem("pokedexState", "open");
  }

  // Lê o estado salvo
  const savedState = localStorage.getItem("pokedexState");

  if (savedState === "open") {
    setOpenState(false); // false pra não salvar de novo
  } else {
    setClosedState(false);
  }

  pokedexClose.addEventListener("click", () => {
    setOpenState();
  });

  pokedexOpen.addEventListener("click", () => {
    setClosedState();
  });
});
