import { React, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import api from '../../config/api';

export default function SelectType() {

    const [types, setTypes] = useState([]);

    useEffect(() => {
        setTypes(api.get('/types'));
    }, [])

    // Wire backend to provide an array of objects 
    // with the attributes: type and src

    return (
        <div>
            {
                types.forEach((type, index) => {
                    return (
                        <Button><img src={type.src}></img>{type.type}</Button>
                    );
                })
            }
        </div>
    )

}