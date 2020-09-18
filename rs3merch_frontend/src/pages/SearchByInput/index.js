import React, { useState, useEffect, useParams } from 'react';
import api from '../../config/api';
import Items from '../../components/items';

export default function SearchByInput() {

    let { keyword } = useParams();
    const [loaded, setLoaded] = useState(false);
    const filter = "input";

    useEffect(() => {
        async function handleInit() {
            await api.get(`/InitByKeyword/${keyword}`);
    
            setLoaded(true);
        }

        handleInit();
    }, [keyword])

    return (
        <div>
            <h2 class="title">Keyword: {keyword}</h2>
            {
                loaded ?
                    <Items filter={filter} />
                    :
                    <h4>Loading...</h4>
            }
        </div>
    );
}
