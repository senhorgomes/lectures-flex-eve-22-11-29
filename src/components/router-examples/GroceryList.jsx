const GroceryList = ({list, day}) => {
    return (
        <section>
            <h2>Don't forget to buy these things on {day}:</h2>
            <ul>
            {list.map((element, i) => <li key={i}>
                        {element}
                    </li>)}
            </ul>
        </section>
    );
};

export default GroceryList;