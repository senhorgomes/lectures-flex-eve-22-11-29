# Real World React (Advanced Topics)

- React Router
- Styled Components
- `useContext`
- `useRef`

## React Router

Imagine you are developing an SPA (single-page application.) How might you handle the display of the multiple "pages" you are working on? Recall that with an SPA, we do not want to load a new page when interacting with the website's navigation; we want to find another way to dynamically load what look like new pages without refreshing the page.

In React, your first instinct might be to keep track of a state representing the current page:

```JSX
import { useState } from 'react';

const MyWebsite = () => {
  const navLinks = ['home', 'about'];

  const [currentPage, setCurrentPage] = useState(navLinks[0]);

  const handleNavAClick = (event) => {
    event.preventDefault();

    const linkClicked = event.target.href;

    setCurrentPage(linkClicked);
  };

  return (
    <main>
      <nav>
        <a onClick={handleNavAClick} href="home">Home</a>
        <a onClick={handleNavAClick} href="about">About</a>
      </nav>
      {'home' === currentPage &&
        <section>
          <h1>Homepage</h1>
          <p>Welcome to the homepage!</p>
        </section>
      }
      {'about' === currentPage &&
        <section>
          <h1>About</h1>
          <p>Welcome to the about page!</p>
        </section>
      }
      {false === navLinks.includes(currentPage) &&
        <section>
          <h1>404: Page Not Found</h1>
          <p>This page could not be found; please try again.</p>
        </section>
      }
    </main>
  );
};

export default MyWebsite;
```

A solution like the above looks okay at the surface level, but note how we have just "made up" a way to accomplish this task. While easy enough to read and understand, handing this off to a team member will result in that same discovery process each time. It also raises the more important question of how to improve this approach. This does not take into account things like:

* Updating the browser's history when navigating
* Updating the address bar to reflect traveling from "page" to "page"
* Loading a specific page based on the path in the address bar

While each of these are in reach, we are only adding to the first concern: convention. We're also re-inventing the wheel, as this problem has probably been solved before (in fact, it has!)

A popular solution for managing multiple "pages" without reload is the library: [react-router](https://github.com/remix-run/react-router#readme). This can be easily installed via use of npm:

```BASH
npm install react-router-dom # There is also a React Native version
```

The basic implementation steps are pretty simple, thankfully. `react-router` provides us with a few new components that will help us out here:

* `<Router>`: A necessary parent required for `Link` and `Route` to function correctly.
* `<Link to={}>`: An anchor component; when clicked the path will update (without a refresh.)
* `<Route path={} element={} exact>`: Components that will only display if the `path` matches the address bar path.

With this in mind, let's try to update our example to use `react-router` and see if it is as easily done as it is said:

```JSX
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const MyReactRouterApp = () => {
  return (
    <Router>
      <h1>Welcome to our Website</h1>
      <nav>
        <h2>Navigation</h2>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  ):
};

export default MyReactRouterApp;
```

The `react-router` modules have a lot of great features baked in. If you run this example (ensure you have `<Home />` and `<About />` components defined) you'll find that clicking any `<Link />` components results in a change in path; this is reflected in the address bar. As you travel through the site, your `<Routes />` component is watching for such a change, and will display the appropriate match(es). With this, we have an easily readable convention available that also contains a wide set of features, saving us time and helping us stay organized all while maintining the snappy responsiveness of a single-page application.

Here are a couple of common questions that might come up while using `react-router`.

**How do I handle 404s?**

Easy! Add a "wildcard" (`*`) route to catch any paths that don't match your list:

```JSX
<Route path="*" element={<NotFound />} />
```

**My homepage uses the path "`/`", and my other pages won't show... what gives?**

Have a look at the following code snippet:

```JSX
<Route path="/" element={<Home />} />
<Route path="/about" element={<About />} />
```

There is an issue that can occur wherein the `<Home />` component will be the only one that displays, even if you visit `/about`, `/abc`, etc. This is because it will try to render the first `<Route />` that has a `path` that matches the current one in the address bar. Note that all of these sample paths start with `/`... we aren't telling `react-router` to be exact enough. Alright, so how do we accomplish this? We can let it know we need it to *only* render the component on an *exact* match by use of the `exact` prop, like so:

```JSX
<Route path="/" exact element={<Home />} />
<Route path="/about" element={<About />} />
```

Now you'll be able to visit both `<Home />` and `<About />` freely. Consider use of `exact` whenever you have multiple routes that share commonalities or might be likely to conflict.

In the event that our routes become too long, we can also wrap routes within themselves as such.

```JSX
<Route path="/grocery-list/">
    <Route path="monday" element={<GroceryList list={["Milk", "Eggs"]} day="Monday"/>}/>
    <Route path="tuesday" element={<GroceryList list={["Oreos", "Cucumbers"]} day="Tuesday"/>}/>
</Route>
```

This allows us to keep our routes grouped together, and it prevents us from having to repeat the same prefix.

What if you want to represent an individual "show" route? For example: `/products/3`

In a case like that, we need a way to read and interpret paramaters from the current path. Luckily, `react-router` includes a hook for just this: `useParams`

Assuming we actually have products to display, we could handle these by making the following adjustments:

```JSX
<Route path="/products/:id" element={<Product />} />
```

After ensuring you have a route with the parameter in its path, ensure you reference it in the component meant to represent it:

```JSX
import { useParams } from 'react-router-dom';

const Product = ({products}) => {
  const {id} = useParams();

  return (
    <p>
      {products[id].name}
    </p>
  );
};

export default Product;
```

This is quite powerful for easily "passing" identifiers or basic information without prop drilling.

Another hook that can come in handy sometimes is `useNavigate`. This hook provides you with a function that you can trigger to change the current path. Consider the following example:

```JSX
import { useNavigate } from 'react-router-dom';

const NavigateButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/about');
  };

  return (
    <button onClick={handleClick}>
      Click to go to /about.
    </button>
  );
};

export default NavigateButton;
```

## Styled Components

One of our goals in writing components is to ensure they are isolated and can be used multiple times throughout our application. There are a variety of ways you can handle styling your components, you have already seen SASS and vanilla CSS in-use, packaged in via webpack. Let's have a look at an alternative approach that embeds the styles directly in our component files.

One such option is the `styled-components` library. It allows for us to create "styled versions" of regular elements for use in our components. Firstly, ensure you install it:

```BASH
npm install styled-components
```

Observe the recommended syntax:

```JSX
import { styled } from 'styled-components';

const CustomP = styled.p`
  padding: 16px;
  background: salmon;
  border: 3px solid black;
  border-radius: 3px;
`;

const StyledComponentExample = () => {
  return (
    <CustomP>
      Hello, World! This component is styled!
    </CustomP>
  );
};

export default StyledComponentExample;
```

The syntax used is actually a valid JavaScript syntax called tagged templates, a way of passing a string template literal as an argument with the ability to accept additional values within all at once. [Consider exploring it further if you're curious.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates)

How might you style your own component? Have a look at the following syntax:

```JSX
import { styled } from 'styled-components';

import About from './about';

const CustomP = styled.p`
  padding: 16px;
  background: salmon;
  border: 3px solid black;
  border-radius: 3px;
`;

const StyledAbout = styled(About)`
  color: salmon;
  text-decoration: ${props => props.underlined ? 'underline' : 'none'};
`;

const StyledComponentExample = () => {
  return (
    <CustomP>
      Hello, World! This component is styled!
      <About />
      <About underlined={true} />
    </CustomP>
  );
};

export default StyledComponentExample;
```

Note that for the `<About />` to show the assigned styles, you'll have to access the `className` prop—this has been passed down by the `styled` implementation; see the following:

```JSX
const About = ({className}) => {
    return (
        <section className={className}>
            <h2>About Content</h2>
            <p>This might just have an underline!?</p>
        </section>
    );
};

export default About;
```

## `useContext` Hook

Sometimes we end up in situations where the number of levels we must pass state via props down to nested child components becomes very cumbersome. A couple of popular cases where this might occur include user information after a sign-in, or widely-used information loaded from an external API. In such cases, especially in complex applications, it can become very difficult to trace state down through children, to children, to children... and even more difficult to convey this to team members or leave a clue to yourself for later, that this exact trail is the one you must follow for this data. What are we to do to solve this, though?

React has a built-in solution for this: the `useContext` hook. This hook provides us a way of receiving information from anywhere in our application, provided the component in question resides inside of a provider.

To make use of context, we'll first need to initialize one. Create a context file like so:

```JavaScript
import { createContext } from 'react';

export default createContext();
```

With this, we can now set up a provider. Often this is done in the root of a React project, so that all children can have access to it. Consider this simple `App.jsx` file example:

```JSX
import MyContext from './MyContext';
import ShowStateInfo from './ShowStateInfo';

const App = () => {
    const [myState, setMyState] = useState({
        value1: 'test123',
        value2: 3.14
    });

    return (
        <MyContext.Provider value={{myState, setMyState}}>
            {/* Your Components Here! */}
            <ShowStateInfo />
        </MyContext.Provider>
    );
};

export default App;
```

Now let's see how this is accessed in the child components:

```JSX
import { useContext } from 'react';
import MyContext from './MyContext';

const ShowStateInfo = () => {
    const context = useContext(MyContext);

    return (
        <dl>
            <dt>Value1:</dt>
            <dd>{context.value1}</dd>
            <dt>Value2:</dt>
            <dd>{context.value2}</dd>
        </dl>
    );
};

export default ShowStateInfo;
```

Pay close attention: no props are used here! Yet... we're still able to read values from the parent. This is the magic of `useContext`.

## `useRef`

Sometimes there are cases where it is important to keep track of a non-state value between renders. A common case where this comes up is in keeping track of an HTML element (not a JSX virtual DOM representation) between state changes. Recall that every change in state causes a re-render, so all HTML elements you see in the browser for that component are removed from the live DOM and replaced with fresh ones. Sometimes this can happen many times in a second, so it is easy to have a variable lose the live element and run into issues when you try to run properties or methods from it.

Let's see this in action:

```JSX
import { useRef, useState } from 'react';

const SearchForm = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const inputRef = useRef(); // Returns) {current: undefined}

    const handleClick = () => {
        inputRef.current.focus(); // After the "ref" prop below registers, the "current" property represents the <input> element.
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

export default SearchForm;
```

Note that the button event does not have immediate access to our input. In this example we're using `useRef` to reference the current re-rendered HTML element, even if the state changes.

## Resources

* [React Router: Tutorial](https://reactrouter.com/en/main/start/tutorial)
    * [ui.dev: React Router Tutorial](https://ui.dev/react-router-tutorial)
    * [W3Schools: React Router Tutorial](https://www.w3schools.com/react/react_router.asp)
* [Styled Components](https://styled-components.com/)
* [MDN: Tagged Templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates)
* [`useContext`](https://reactjs.org/docs/hooks-reference.html#usecontext)
* [`useRef`](https://reactjs.org/docs/hooks-reference.html#useref)
