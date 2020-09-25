import React from 'react';
import { useParams } from 'react-router-dom'
import Items from '../../components/items';

export default function SearchType() {

    let { type } = useParams();
    const filter = "type";

    return (
        <div>
            <h2 className="title">{type} Items</h2>
            <Items filter={filter} keyword={type} />
        </div>
    );
}