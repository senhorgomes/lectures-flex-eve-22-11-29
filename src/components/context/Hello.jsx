import { useContext } from 'react';
//useContext will only be invoked inside of the child components
import CountContext from './CountContext';

const Hello = () => {
   //  const context = useContext(CountContext);
   const {hello} = useContext(CountContext)
   return (
      <p>{hello}</p>
   );
};

export default Hello;
