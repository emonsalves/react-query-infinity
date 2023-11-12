import { useQuery } from '@tanstack/react-query';
import { PropTypes } from 'prop-types';
import { getPokemon } from '../api/querys/getPokemon';
import Badge from './Badge';

const PokemonCard = ({ pokemonName }) => {
    const { data: pokemon } = useQuery({
        queryFn: () => getPokemon({ pokemonName }),
        queryKey: ['pokemon', pokemonName],
    });

    return (
        pokemon && (
            <article className="pokemon-card flex flex-col border border-slate-200 hover:shadow-lg transition-all ease-in-out duration-300 hover:shadow-slate-800 rounded-md p-5 h-full justify-end hover:scale-105 ">
                <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="w-full h-full object-cover"
                />
                <div className="flex flex-col justify-between items-center">
                    <h3 className="text-3xl font-bold capitalize">{pokemonName}</h3>
                    <p className="text-xl font-light">N° {pokemon.id}</p>
                </div>
                <div className="flex gap-2 mt-3">
                    {pokemon.types.map((type, index) => (
                        <Badge type={type.type.name} key={index} />
                    ))}
                </div>
                <div className="flex gap-2 mt-3">
                    <p>
                        <span className="text-lg">Base Exp:</span>
                        {` `}
                        <span className="text-lg font-light">{pokemon.base_experience}</span>
                    </p>
                    <p>
                        <span className="text-lg">Weight:</span>
                        {` `}
                        <span className="text-lg font-light">{pokemon.weight}</span>
                    </p>
                    <p>
                        <span className="text-lg">Height:</span>
                        {` `}
                        <span className="text-lg font-light">{pokemon.height}</span>
                    </p>
                </div>
            </article>
        )
    );
};

export default PokemonCard;

PokemonCard.propTypes = {
    pokemonName: PropTypes.string.isRequired,
};
