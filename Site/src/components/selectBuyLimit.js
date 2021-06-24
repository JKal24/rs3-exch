import React, { useState, useEffect } from 'react';
import { Collapse, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getBuyLimits } from '../data/commands'
import { createBuyLimits } from '../redux/reducers/nav';

export default function SelectBuyLimit() {

    const [buyLimits, setBuyLimits] = useState([]);
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        async function handleBuyLimits() {
            setBuyLimits(await getBuyLimits());
        }

        handleBuyLimits();
    }, [])

    return (
        <div>
            <Button className='link-nav' variant="dark" onClick={() => setOpen(!open)} aria-controls="buy-limits" aria-expanded={open}>
                Buy Limits
            </Button>
            <Collapse in={open}>
                <div id="buy-limits">
                    {
                        // Listing of each buy limit

                        buyLimits.map((buyLimit, index) => {
                            return (
                                <div key={index} className='link-nav-container'>
                                    <a href={`/buylimit/${buyLimit}`} className='link-nav-text'>
                                        {buyLimit.replace('_', ' ')}
                                    </a>
                                </div>
                            )
                        })
                    }
                </div>
            </Collapse>
        </div>
    )

}