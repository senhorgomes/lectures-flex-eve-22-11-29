import { useState } from 'react';
//Have a SPA apply routes the same way an express app would work
// local:3000/about -> About the page
// local:3000/ or /home -> Home page
const CustomRouter = () => {
    const [currentPage, setCurrentPage] = useState('home');

    const handleNavAClick = (event) => {
        event.preventDefault();
        console.log(event.target.href)
        const linkParts = event.target.href.split('/');
        setCurrentPage(linkParts[linkParts.length - 1]);
    };

    return (
        <main>
            <h1>Welcome to our Website</h1>
            <nav>
                <a href="home" onClick={handleNavAClick}>Homepage</a>
                <br/>
                <a href="about" onClick={handleNavAClick}>About</a>
            </nav>
            {'home' === currentPage &&
                <section>
                    <h2>Homepage!</h2>
                    <p>This is the homepage.</p>
                </section>
            }
            {'about' === currentPage &&
                <section>
                    <h2>About!</h2>
                    <p>All about us!.</p>
                </section>
            }
        </main>
    );
};

export default CustomRouter;
