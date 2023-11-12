const pokemonBaseUrl = 'https://pokeapi.co/api/v2';

const getPokemons = async ({ url, limit, offset }) => {
    const urlToFetch = url ?? `${pokemonBaseUrl}/pokemon?limit=${limit}&offset=${offset}`;
    const response = await fetch(urlToFetch);
    if (!response.ok) {
        throw new Error('Error fetching pokemons');
    }
    const data = await response.json();
    return data;
};

export { getPokemons };
