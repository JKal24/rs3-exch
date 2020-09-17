import { React, useState, useEffect } from 'react';
import { Button, Fade } from 'react-bootstrap';
import { Link } from  'react-router-dom';
import api from '../config/api';

export default function SelectType() {

    const [types, setTypes] = useState([]);
    const [collapsed, setCollapsed] = useState(true);

    useEffect(async () => {
        setTypes(await api.get('/TypeListing'));
    }, [])

    return (
        <div>
            <Button onClick={setCollapsed("false")} variant="primary" value="Types">
            </Button>
            <Fade in={!collapsed}>
                {
                    types.map((type, index) => {
                        return (
                            <Link to={`/type/${type}`} className="type">{type}</Link>
                        );
                    })
                }
            </Fade>
        </div>
    )

}