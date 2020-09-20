import React, { useState, useEffect, useParams } from 'react';
import api from '../../config/api';
import Items from '../../components/items';

export default function SearchBuyLimit() {

    let { buy_limit } = useParams();
    const [loaded, setLoaded] = useState(false);
    const filter = 'buylimit';

    useEffect(() => {
        async function handleInit() {
            await api.get(`/BuyLimitInit/${buy_limit}`);
    
            setLoaded(true);
        }
        handleInit();
    }, [buy_limit])

    return (
        <div>
            <h2 className="title">Buy Limit: {buy_limit}</h2>
            {
                loaded ?
                    <Items filter={filter} />
                    :
                    <h4>Getting Items...</h4>
            }
        </div>
    );
}