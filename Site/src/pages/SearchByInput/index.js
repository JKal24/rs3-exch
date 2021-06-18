import React from 'react';
import { useParams } from 'react-router-dom'
import Items from '../../components/items';

export default function SearchByInput(props) {

    let { keyword } = useParams();
    const filter = "input";

    return (
        <div className="contents">
            <h2  className="contents-title">'{keyword}' Items</h2>
            <Items filter={filter} keyword={keyword} plots={props.plots} />
        </div>
    );
}
