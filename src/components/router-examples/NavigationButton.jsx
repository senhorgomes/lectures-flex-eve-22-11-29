import { useNavigate } from 'react-router-dom'

const NavigationButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };

    return (
        <button onClick={handleClick}>
            Click to go Home
        </button>
    );
};

export default NavigationButton;
