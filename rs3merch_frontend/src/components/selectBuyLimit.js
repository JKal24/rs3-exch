import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import api from '../config/api';

export default function SelectBuyLimit() {

    const [buyLimits, setBuyLimits] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        async function handleBuyLimits() {
            setBuyLimits((await api.get('/BuyLimitListing')).data);
        }

        handleBuyLimits();
        setLoaded(true);
    }, [])

    // Listing of each buy limit

    const BuyLimits = () => {
        return (
            <>
                {
                    loaded ?
                        buyLimits.map((buyLimit, index) => {
                            return (
                                <Dropdown.Item href={`/buylimit/${buyLimit}`} key={index}>
                                    {buyLimit.replace('_', ' ')}
                                </Dropdown.Item>
                            )
                        })
                        :
                        <h3>Loading...</h3>
                }
            </>
        )
    }

    return (
        <>
            <DropdownButton title="Buy Limits" variant="dark" className='nav'>
                <BuyLimits />
            </DropdownButton>
        </>
    )

}