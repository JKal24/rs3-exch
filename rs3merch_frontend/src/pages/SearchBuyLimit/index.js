import React from 'react';
import { useParams } from 'react-router-dom';
import Items from '../../components/items';

export default function SearchBuyLimit() {

    let { buy_limit } = useParams();
    const filter = "buylimit";

    return (
        <div>
            <h2 className="title">{buy_limit.replace('_', ' ')} Buy Limit Items</h2>
            <Items filter={filter} keyword={buy_limit} />
        </div>
    );
}