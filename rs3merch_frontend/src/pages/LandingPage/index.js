import React from 'react';
import Items from '../../components/items';

export default function LandingPage() {

    return (
        <div className="contents">
            <h2 className="contents-title">Favorites</h2>
            <Items landingPage={true} />
        </div>
    )
}
