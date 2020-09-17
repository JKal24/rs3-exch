import { React, useEffect, useParams } from 'react';
import Items from '../../components/items';
import { api } from '../../config/api';

export default function SearchType() {

    let { type } = useParams();
    const filter = "type";

    useEffect(() => {
        await api.get(`/InitByType/${type}`)
    })

    return (
        <div>
            <h2 class="title"></h2>
            <Items filter={filter} />
        </div>
    )

}