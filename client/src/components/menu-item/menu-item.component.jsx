import React from 'react';
import { withRouter } from 'react-router-dom';

import './menu-item.styles.scss';

const MenuItem = ({ id, name, featured_image, history, match }) => (
    <div className="menuContainer"
        onClick={()=>history.push(`${match.url}/${id}`)}
    >
        <div className="menuImgContainer" style={{backgroundImage: `url(${featured_image})`}} />
        <div className="contentContainer">
            <span className="contentTitle">{name}</span>
            <span className="contentSubtitle">BROWSE MENU</span>
        </div>
    </div>
);

export default withRouter(MenuItem);