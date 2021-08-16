import React from 'react';
import { useParams } from 'react-router-dom'
import Items from '../../components/items';

export default function SearchByFilter() {

    const data = useParams();
    const filter = "input-filter";

    return (
        <div className="contents">
            <h2 className="contents-title">'{data.keyword}' Items</h2>
            <Items filter={filter} data={data} />
        </div>
    );
}
