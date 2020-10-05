import React from 'react';
import { useParams } from 'react-router-dom'
import Items from '../../components/items';

export default function SearchByInput() {

    let { keyword } = useParams();
    const filter = "input";

    return (
        <div>
            <h2 className="title">'{keyword}' Items</h2>
            <Items filter={filter} keyword={keyword} />
        </div>
    );
}
