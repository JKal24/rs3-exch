import React, { useState, useEffect } from 'react';
import { Button, Collapse } from 'react-bootstrap';
import api from '../config/api';

export default function SelectType() {

    const [types, setTypes] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        async function handleTypes() {
            setTypes((await api.get('/TypeListing')).data);
        }

        handleTypes();
    }, [])

    return (
        <>
            <Button className='link-nav' variant="dark" onClick={() => setOpen(!open)} aria-controls="types" aria-expanded={open}>
                Types
            </Button>
            <Collapse in={open}>
                <div id="types">
                    <>
                        {
                            // Listing of each type

                            types.map((type, index) => {
                                return (
                                    <div key={index} className='link-nav-container'>
                                        <a href={`/type/${type}`} key={index} className='link-nav-text'>
                                            {type.replace('_', ' ')}
                                        </a>
                                    </div>
                                );
                            })
                        }
                    </>
                </div>
            </Collapse>
        </>
    )

}