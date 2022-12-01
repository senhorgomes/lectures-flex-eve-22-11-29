import { useContext } from 'react';
//useContext will only be invoked inside of the child components
import CountContext from './CountContext';

const CountDisplay = () => {
   //  const context = useContext(CountContext);
   const {count, setCount, hello} = useContext(CountContext)
   console.log(hello)
   return (
      <p>Button clicked {count} times.</p>
   );
};

export default CountDisplay;
