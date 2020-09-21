import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import Items from '../../components/items';

export default function SearchStable() {

    const filter = "stable";

    useEffect(() => {
        async function handleInit() {
            await api.get(`/StableItemInit`)
        }

        handleInit();
    }, [])

    return (
        <div>
            <h2 className="title">Stable Items</h2>
            <Items filter={filter} />
        </div>
    );
}