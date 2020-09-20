import React, { useState, useEffect, useParams } from 'react';
import Items from '../../components/items';
import api from '../../config/api';

export default function SearchType() {

    let { type } = useParams();
    const filter = "type";
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        async function handleInit() {
            await api.get(`/InitByType/${type}`)
    
            setLoaded(true);
        }
    
        handleInit();
    }, [type])

    return (
        <div>
            <h2 className="title">Type: {type}</h2>
            {
                loaded ?
                    <Items filter={filter} />
                    :
                    <h4>Getting Items...</h4>
            }
        </div>
    );

}