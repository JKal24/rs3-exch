import React from 'react';
import Items from '../../components/items';

export default function SearchRising() {

    const filter = "rising";

    return (
        <div className="contents">
            <h2  className="contents-title">Items Rising in Price</h2>
            <Items filter={filter} />
        </div>
    );
}