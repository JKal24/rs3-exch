import React, { useState, useEffect } from 'react';
import { Button, Fade } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../config/api';

export default function SelectBuyLimit() {

    const [buyLimits, setBuyLimits] = useState([]);
    const [collapsed, setCollapsed] = useState(true);

    useEffect(() => {
        async function handleBuyLimits() {
            setBuyLimits(await api.get('/BuyLimitListing'));
        }
        
        handleBuyLimits();
    }, [])



    return (
        <div>
            <Button onClick={setCollapsed(false)} variant="info" value="Buy Limits">
            </Button>
            <Fade in={!collapsed}>
                {
                    buyLimits.map((buyLimit, index) => {
                        return (
                            <Link to={{ pathname: `/buylimit/${buyLimit}` }}></Link>
                        )
                    })
                }
            </Fade>
        </div>
    )

}