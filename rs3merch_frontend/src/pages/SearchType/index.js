import React from 'react';
import { useParams } from 'react-router-dom'
import Items from '../../components/items';

export default function SearchType(props) {

    let { type } = useParams();
    const filter = "type";

    return (
        <div className="contents">
            <h2  className="contents-title">{type.replace('_', ' ')} Items</h2>
            <Items filter={filter} keyword={type} plots={props.plots} />
        </div>
    );
}