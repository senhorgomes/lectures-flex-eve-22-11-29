import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link
} from 'react-router-dom';

import Home from './Home';
import GroceryList from './GroceryList';
import About from './About';
import NotFound from './NotFound';
import PlantPokemons from './PlantPokemons';
import NavigationButton from './NavigationButton';

const ExampleReactRouter = () => {
    return (
        <Router>
            {/* Still static content */}
            <h1>Welcome to our Website</h1>
            <nav>
                <h2>Website Nav</h2>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/plant-pokemon">View Plant Pokemon</Link></li>
                </ul>
            </nav>
            <Routes>
                {/* <Route path="/" exact element={<Home />} />
                <Route path="/grocery-list" element={<GroceryList />}/>
                <Route path="/about" element={<About />} />
                <Route path="/plant-pokemon/*" element={<PlantPokemons />} />
                <Route path="*" element={<NotFound />} /> */}
                <Route path="/" exact element={<Home />} />
                <Route path="/grocery-list/">
                    <Route path="monday" element={<GroceryList list={["Milk", "Eggs"]} day="Monday"/>}/>
                    <Route path="tuesday" element={<GroceryList list={["Oreos", "Cucumbers"]} day="Tuesday"/>}/>
                </Route>
                {/* <Route path="/grocery-list/tuesday" element={<GroceryList list={["Oreos", "Cucumbers"]} day="Tuesday"/>}/> */}
                <Route path="/about" element={<About />} />
                <Route path="/plant-pokemon/*" element={<PlantPokemons />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            {/* <NavigationButton /> */}
        </Router>
    );
};

export default ExampleReactRouter;
