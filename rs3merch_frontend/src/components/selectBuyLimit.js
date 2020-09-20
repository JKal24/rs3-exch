import React, { useState, useEffect } from 'react';
import { Button, Fade, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../config/api';

export default function SelectBuyLimit() {

    const [buyLimits, setBuyLimits] = useState([]);
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        async function handleBuyLimits() {
            setBuyLimits(await api.get('/BuyLimitListing'));
        }

        handleBuyLimits();
    }, [])

    const BuyLimits = () => {
        return (
            buyLimits.map((buyLimit, index) => {
                return (
                    <Link to={`/buylimit/${buyLimit}`} className='buylimit'></Link>
                )
            })
        )
    }

    return (
        <div>
            <Button onClick={() => setCollapsed(!collapsed)} variant="light">
                Buy Limits
                <Fade in={collapsed}>
                    <BuyLimits />
                </Fade>
            </Button>
        </div>
    )

}