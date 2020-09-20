import React, { useState, useEffect } from 'react';
import { Button, Fade } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../config/api';

export default function SelectType() {

    const [types, setTypes] = useState([]);
    const [collapsed, setCollapsed] = useState(true);

    useEffect(() => {
        async function handleTypes() {
            setTypes(await api.get('/TypeListing'));
        }

        handleTypes();
    }, [])

    const Types = () => {
        return (
            types.map((type, index) => {
                return (
                    <Link to={`/type/${type}`} className="type">{type}</Link>
                );
            })
        )
    }

    return (
        <div>
            <Button onClick={() => setCollapsed(!collapsed)} variant="light">
                Types
            <Fade in={!collapsed}>
                    <Types />
                </Fade>
            </Button>
        </div>
    )

}