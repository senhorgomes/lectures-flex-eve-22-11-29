import pokemon from '../../data/plant-pokemon.json';

import {Route, Routes, Link} from 'react-router-dom';

import PlantPokemon from './PlantPokemon';

const PlantPokemons = () => {
    return (
        <section>
            <h2>Select a Pokemon</h2>
            <nav>
                <ul>
                    {pokemon.map((p, i) => <li key={i}>
                        <Link to={i}>{p.name}</Link>
                    </li>)}
                </ul>
            </nav>
            <Routes>
                <Route path=":pokemonId" element={<PlantPokemon pokemon={pokemon} />} />
            </Routes>
        </section>
    );
};

export default PlantPokemons;
