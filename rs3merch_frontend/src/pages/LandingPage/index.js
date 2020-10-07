import React from 'react';
import Items from '../../components/items';

export default function LandingPage() {

    return (
        <div>
            <h2>Favorites</h2>
            <Items landingPage={true} />
        </div>
    )
}
