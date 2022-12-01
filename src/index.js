import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import CustomRouter from './components/router-examples/CustomRouter';
import ExampleReactRouter from './components/router-examples/ExampleReactRouter';
import StyledComponentExample from './components/styled-components/StyledComponentExample';
import Counter from './components/context/Counter';
import ReferenceExample from './components/reference/ReferenceExample';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <CustomRouter /> */}
    {/* <ExampleReactRouter /> */}
    {/* <StyledComponentExample /> */}
    <Counter />
    {/* <ReferenceExample /> */}
  </React.StrictMode>
);
