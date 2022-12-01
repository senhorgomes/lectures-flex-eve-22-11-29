import { useState } from 'react';
import CountContext from './CountContext';
//Context provider parent component
import CountDisplay from './CountDisplay';
import CountUpdater from './CountUpdater';
import Hello from './Hello';

const Counter = () => {
    const [count, setCount] = useState(0);

    return (
        <>
            <h1>Counter</h1>
            <CountContext.Provider value={{count, setCount, hello:"Hello"}}>
                <CountDisplay>
                    <Hello/>
                </CountDisplay>
                <CountUpdater />
            </CountContext.Provider>
        </>
    );
};

export default Counter;
