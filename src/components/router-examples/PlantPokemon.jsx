import { useParams } from 'react-router-dom';

const PlantPokemon = ({pokemon}) => {
    const params = useParams();
    console.log(params);

    return (
        <h3>Current Pokemon: {pokemon[params.pokemonId].name}</h3>
    );
};

export default PlantPokemon;
