import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { Fragment, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import { getPokemons } from '../api/querys/getPokemons';

const PokemonList = () => {
    const result = useInfiniteQuery({
        getNextPageParam: (lastPage) => lastPage.next,
        queryFn: ({ pageParam }) => getPokemons({ url: pageParam }),
        queryKey: ['pokemons'],
    });
    const { data, status, fetchNextPage, error } = result;
    const { ref, inView } = useInView({ threshold: 0 });

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
                                <Fragment key={pokemon.name}>
                                    {index === page.results.length - 1 ? (
                                        <div ref={ref}>
                                            <PokemonCard pokemonName={pokemon.name} />
                                        </div>
                                    ) : (
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
