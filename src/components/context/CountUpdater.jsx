import { useContext } from 'react';
import CountContext from './CountContext';

const CountUpdater = () => {
    const {setCount} = useContext(CountContext);

    const handleClick = () => {
        setCount(prev =>  Number(prev) + 1);
    };

    return (
        <button onClick={handleClick}>
            Click to Update Count
        </button>
    );
};

export default CountUpdater;
