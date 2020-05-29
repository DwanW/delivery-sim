import React from 'react';
import './hero.styles.scss'

const Hero = () => (
    <div className="hero">
        <div className="main-title">Your Local Delivery</div>
        <div className="main-input">
            <input name="location" type="text" placeholder="Enter Your Address"></input>
            <button>{"Find Local Restaurants".toUpperCase()}</button>
        </div>
    </div>
)

export default Hero;