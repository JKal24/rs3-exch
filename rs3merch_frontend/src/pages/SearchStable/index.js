import React from 'react';
import Items from '../../components/items';

export default function SearchStable(props) {

    const filter = "stable";

    return (
        <div className="contents">
            <h2  className="contents-title">Stable Items</h2>
            <Items filter={filter} plots={props.plots} />
        </div>
    );
}