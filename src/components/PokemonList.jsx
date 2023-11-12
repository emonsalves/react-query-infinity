import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { Fragment, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import { getPokemons } from '../api/querys/getPokemons';

const PokemonList = () => {
    const result = useInfiniteQuery({
        // se usa el useInfiniteQuery para hacer la paginacion
        getNextPageParam: (lastPage) => lastPage.next,
        // se usa el getNextPageParam para obtener la url de la siguiente pagina
        queryFn: ({ pageParam }) => getPokemons({ url: pageParam }),
        // se usa el queryFn para obtener la data de la pagina
        queryKey: ['pokemons'],
        // se usa el queryKey para que no se repita la peticion
    });
    const { data, status, fetchNextPage, error } = result;
    // se desestructura el result para obtener la data, el status, la funcion fetchNextPage y el error
    const { ref, inView } = useInView({ threshold: 0 });
    // se usa el useInView para saber si el ultimo pokemon de la pagina esta en el viewport

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage]);

    if (status === 'pending') return <p>Loading...</p>;

    if (status === 'error') return <p>Error : {error.message}</p>;

    return (
        <>
            <h1 className="md:text-8xl text-5xl font-bold mb-6">Pokemon List</h1>
            <section className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-flow-row gap-4 w-full">
                {data &&
                    data.pages.map((page) => {
                        return page.results.map((pokemon, index) => {
                            return (
                                // aca se usa el fragment para que no se repita el key en el div
                                <Fragment key={pokemon.name}>
                                    {/* si es el ultimo pokemon de la pagina se le agrega el ref */}
                                    {/* para que cuando se haga scroll se renderize el siguiente pokemon */}
                                    {index === page.results.length - 1 ? (
                                        <div ref={ref}>
                                            <PokemonCard pokemonName={pokemon.name} />
                                        </div>
                                    ) : (
                                        // si no es el ultimo pokemon se renderiza normal
                                        <PokemonCard pokemonName={pokemon.name} />
                                    )}
                                </Fragment>
                            );
                        });
                    })}
            </section>
        </>
    );
};

export default PokemonList;
