import React from 'react';
import logo from '../../../../assets/img/WhatsApp Image 2024-09-10 at 11.29.06 AM.jpeg';

export const HeaderAnime = () => {
    return (
        <div className="container-header-anime">
            <div className="header-content">
                <img src={logo} alt="" className="banner-header" />
                <div className="overlay"></div>
                <h1 className="title-header">Discover the Anime World</h1>
            </div>
        </div>
    );
}
