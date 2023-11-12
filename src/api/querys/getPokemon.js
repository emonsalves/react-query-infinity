const pokemonBaseUrl = 'https://pokeapi.co/api/v2';

const getPokemon = async ({ pokemonName }) => {
    const response = await fetch(`${pokemonBaseUrl}/pokemon/${pokemonName}`);
    if (!response.ok) {
        throw new Error('Error fetching pokemon');
    }
    const data = await response.json();

    return data;
};

export { getPokemon };
