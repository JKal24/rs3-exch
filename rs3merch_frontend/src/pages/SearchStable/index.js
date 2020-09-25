import React from 'react';
import Items from '../../components/items';

export default function SearchStable() {

    const filter = "stable";

    return (
        <div>
            <h2 className="title">Stable Items</h2>
            <Items filter={filter} />
        </div>
    );
}