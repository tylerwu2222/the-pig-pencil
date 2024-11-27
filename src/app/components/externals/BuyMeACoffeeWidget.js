import React from 'react';
import './BuyMeACoffeeWidget.css'


const BuyMeACoffeeWidget = () => {

    return (
        <>
            <div className="buy-me-a-coffee-widget"
                title='Give Tyler money'
                style={{ textAlign: 'center' }}>
                <a href="https://www.buymeacoffee.com/thepigpencil" target="_blank" rel="noopener noreferrer">
                    <img className="buy-me-a-coffee-icon" src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Buy me a coffee" />
                </a>
            </div>
        </>
    );
};

export default BuyMeACoffeeWidget;
