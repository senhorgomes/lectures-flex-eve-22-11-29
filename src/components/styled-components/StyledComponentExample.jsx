import styled, {css} from 'styled-components';

import MyCustomComponent from './MyCustomComponent';

const StyledLI = styled.li`
    border: 4px solid red;
    color: black;
    background: lavender;
    border-radius: 2px;
    font-size: large;
    margin:16px;
`

const StyledP = styled.p`
    color: black;
    padding: 16px;
    background: salmon;
    border: 3px solid black;
    border-radius: 6px;
`;

const StyledMyCustomComponent = styled(MyCustomComponent)`
    color: salmon;
    padding: 16px;
    background: black;
    text-decoration: ${props => props.underline ? 'underline' : 'none'};
    ${props => props.primary && css`
    background: palevioletred;
    color: white;
  `}
`;

const StyledComponentExample = () => {
    return (
        <>
            <StyledP>Grocery List</StyledP>
            <ul>
                {["Eggs", "Cucumbers", "Chips"].map((element) => {
                    return <StyledLI>{element}</StyledLI>
                })}
            </ul>
            <StyledMyCustomComponent />
            <StyledMyCustomComponent underline={true} primary={true} />
        </>
        // <>  
        //     <StyledP>Hello, World! <strong>So cool!!!</strong></StyledP>
        //     <StyledP>Goodbye, World!</StyledP>
        // </>
    );
};

export default StyledComponentExample;
