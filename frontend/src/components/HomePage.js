import React from 'react';
import {useNavigate} from 'react-router-dom'

const HomePage = () => {
const navigate = useNavigate();

const navigateToHome = ()=>{
    navigate("/register")
}

    return (
        <div className="home-page">
            <header className="hero-section">
                <div className="hero-content">
                    <h2>Track Your Expenses Effortlessly</h2>
                    <p>Manage your finances with ease and efficiency.</p>
                    <a href="#" onClick={navigateToHome} className="hero-button">Get Started</a>
                </div>
            </header>


            <footer className="contact-section" id="contact">
                <h2>Contact Us</h2>
                <p>Email: daniyal@gmail.com</p>
            </footer>
        </div>
    );
};

export default HomePage;
