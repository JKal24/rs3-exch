import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import Items from '../../components/items';

export default function SearchByInput() {

    const filter = "stable";
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        async function handleInit() {
            await api.get(`/StableItemInit`)
    
            setLoaded(true);
        }
    
        handleInit();
    }, [])

    return (
        <div>
            <h2 className="title">Stable Items</h2>
            {
                loaded ?
                    <Items filter={filter} />
                    :
                    <h4>Getting Items...</h4>
            }
        </div>
    );
}