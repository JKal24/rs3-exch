import React from 'react';
import Items from '../../components/items';

export default function SearchInvestments() {

    const filter = "invest";

    return (
        <div className="contents">
            <h2  className="contents-title">Investment Items</h2>
            <Items filter={filter} />
        </div>
    );
}