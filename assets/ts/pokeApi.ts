const pokeApi = {
    getPokemonDetail: (pokemon: any) => {
        return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemonModel);
    },
    getPokemons: (offset = 0, limit = 10) => {
        const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
        return fetch(url)
            .then((response) => response.json())
            .then(jsonBody => jsonBody.results)
            .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
            .then((detailRequests) => Promise.all(detailRequests))
            .then((pokemonsDetails) => pokemonsDetails)
    }
};

function convertPokeApiDetailToPokemonModel(pokeApiDetail: any) {
    const pokemon = new Pokemon();
    pokemon.id = pokeApiDetail.id;
    pokemon.name = pokeApiDetail.name;

    const types = pokeApiDetail.types.map((typeSlot: any) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeApiDetail.sprites.other.dream_world.front_default;

    return pokemon;
}