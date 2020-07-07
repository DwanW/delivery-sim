import React from 'react';
import { withRouter } from 'react-router-dom';

import './menu-item.styles.scss';

const MenuItem = ({ id, name, user_rating, featured_image, history, match, cuisine_menu }) => (
    <div className="menuContainer"
        onClick={()=>history.push(`${match.url}/${id}`)}
    >
        <div className="menuImgContainer" style={{backgroundImage: `url(${featured_image?featured_image:'cuisine-collection/'+ cuisine_menu.name +'.webp' })` }} />
        <div className="contentContainer">
            <span className="contentTitle">{name}</span>
            <div className='reviewContainer'>
                <span style={{color: `#${user_rating.rating_color}`}} title="review score and count">{user_rating.aggregate_rating} ({user_rating.votes})</span>
                <span>User Rating: <span style={{color: `#${user_rating.rating_color}`}} >{user_rating.rating_text}</span></span>
            </div>
            <span className="contentSubtitle">BROWSE MENU</span>
        </div>
    </div>
);

export default withRouter(MenuItem);