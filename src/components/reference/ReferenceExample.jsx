import { useRef, useState } from 'react';

const ReferenceExample = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const inputRef = useRef();

    const handleClick = (event) => {
        // event.target.parent.children[0].children[1]
        // document.querySelector('input')

        console.log(inputRef);
        //Focus to the current property, meaning the current element
        inputRef.current.focus();
    };

    return (
        <form onSubmit={event => event.preventDefault()}>
            <label>
                Enter Search Term:
                <input
                    ref={inputRef}
                    value={searchTerm}
                    onChange={event => setSearchTerm(event.target.value)}
                />
            </label>
            <button onClick={handleClick}>
                Focus Search Input
            </button>
        </form>
    );
};

export default ReferenceExample;
