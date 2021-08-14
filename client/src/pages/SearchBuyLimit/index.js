import React from 'react';
import { useParams } from 'react-router-dom';
import Items from '../../components/items';

export default function SearchBuyLimit() {

    let { buylimit } = useParams();
    const filter = "buylimit";

    return (
        <div className="contents">
            <h2 className="contents-title">{buylimit.replace('_', ' ')} Buy Limit Items</h2>
            <Items filter={filter} data={buylimit} />
        </div>
    );
}