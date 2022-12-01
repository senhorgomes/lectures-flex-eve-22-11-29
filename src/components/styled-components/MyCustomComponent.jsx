const MyCustomComponent = (props) => {
    // console.log(props); // Styled gives us custom classes!

    return (
        <p className={props.className}>This is a custom component!</p>
    );
};

export default MyCustomComponent;
