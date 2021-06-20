import React from 'react';
import Items from '../../components/items';

export default function SearchFalling() {

    const filter = "falling";

    return (
        <div className="contents">
            <h2  className="contents-title">Items Falling in Price</h2>
            <Items filter={filter} />
        </div>
    );
}