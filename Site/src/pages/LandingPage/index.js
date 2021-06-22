import React from 'react';
import Items from '../../components/items';

export default function LandingPage() {

    const filter = "falling";

    return (
        <div className="contents">
            <h2 className="contents-title">Runescape Item Information</h2>
            <Items filter={filter} />
        </div>
    )
}
