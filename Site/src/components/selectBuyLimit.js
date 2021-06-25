import React, { useEffect } from 'react';
import { Collapse, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createBuyLimits, toggleOpenBuylimits } from '../redux/reducers/nav';

export default function SelectBuyLimit() {

    const dispatch = useDispatch();

    const buylimits = useSelector(state => state.nav.buylimits);
    const open = useSelector(state => state.nav.openBuyLimits);
    const loaded = useSelector(state => state.nav.loadedBuyLimits);

    useEffect(() => {
        dispatch(createBuyLimits());
    }, [dispatch])

    return (
        <div>
            <Button className='link-nav' variant="dark" onClick={() => dispatch(toggleOpenBuylimits())} aria-controls="buy-limits" aria-expanded={open}>
                Buy Limits
            </Button>
            {
                loaded ? (
                    <Collapse in={open}>
                        <div id="buy-limits">
                            {
                                // Listing of each buy limit

                                buylimits.map((buyLimit, index) => {
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
                ) : (
                    <>
                    </>
                )
            }
        </div>
    )

}