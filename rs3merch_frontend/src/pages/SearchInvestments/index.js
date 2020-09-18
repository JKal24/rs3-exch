import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import Items from '../../components/items';

export default function SearchInvestments() {

    const filter = "invest";
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        async function handleInit() {
            await api.get(`/InvestmentInit`);
    
            setLoaded(true);
        }
        
        handleInit();
    }, [])

    return (
        <div>
            <h2 class="title">Investment Items</h2>
            {
                loaded ?
                    <Items filter={filter} />
                    :
                    <h4>Loading...</h4>
            }
        </div>
    );
}