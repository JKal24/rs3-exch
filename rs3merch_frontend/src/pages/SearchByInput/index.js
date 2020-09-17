import { React, useState, useEffect, useParams } from 'react';
import { Button } from 'react-bootstrap';
import { api, getInfo } from '../../config/api';
import Items from '../../components/items';

export default function SearchByInput() {

    let { keyword } = useParams();
    const filter = "input";

    useEffect(async () => {
        await api.get(`/InitByKeyword/${keyword}`)
    }, [])
    
    return (
        <div>
            <h2 class="title">Keyword: {keyword}</h2>
            <Items filter={filter} />
        </div>
    )
}