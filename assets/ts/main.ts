const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151;
const limit = 10;
let offset = 0;

const pokemonListItem = (pokemon: any) => {
    return `
        <li class="pokemonListItem ${pokemon.type}">
            <span class="number">#${pokemon.id}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type: string) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadMorePokemons(offset: number, limit: number) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {

        if(pokemonList !== null) 
        pokemonList.innerHTML += pokemons.map(pokemonListItem).join('');
    })
}

loadMorePokemons(offset, limit);


loadMoreButton?.addEventListener('click', () => {
    console.log('Button clicked')
    offset += limit;
    const qtyRecordWithNextPage = offset + limit;

    if(qtyRecordWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadMorePokemons(offset, newLimit);

        loadMoreButton?.parentElement?.removeChild(loadMoreButton);
    } else {
        loadMorePokemons(offset, limit);
    }
})

