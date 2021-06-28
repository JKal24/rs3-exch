import React, { useEffect } from 'react';
import { Container, Button, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { refresh, incrementPage, decrementPage, setFirstPage, readItems, refreshItems, readPageLimits } from '../app/reducers/items';
import '../spreadsheets/items.css';

export default function Items(props) {

    const dispatch = useDispatch();

    const pageItems = useSelector(state => state.items.pageItems);
    const page = useSelector(state => state.items.page);
    const loaded = useSelector(state => state.items.loaded);

    /** 
     * Items will be loaded in through useEffect the first time, 
     * afterwards they will be loaded in through handleNextPage
     */

    useEffect(() => {
        dispatch(readPageLimits());
        dispatch(readItems({ filter: props.filter, param: props.keyword }));

        return () => {
            dispatch(refreshItems());
            dispatch(refresh());
        }
    }, [props.filter, props.keyword, dispatch])

    function handleFirstPage() {
        dispatch(setFirstPage());
    }

    function handlePreviousPage() {
        dispatch(decrementPage());
    }

    function handleNextPage() {
        dispatch(incrementPage());
    }

    return (
        <div>
            {loaded ? (
                <div>
                    <div className="item-table">

                        { /* Makes a header for the table of items */}
                        <div className="item-row">
                            <div className="val"></div>
                            <div className="val">Item Name</div>
                            <div className="val">Buy Limit</div>
                            <div className="val">Price</div>
                            <div className="val">Weekly Variation</div>
                            <div className="val">Monthly Variation</div>
                            <div className="val">Long-term Variation</div>
                            <div className="val">Weekly Valuation</div>
                            <div className="val">Monthly Valuation</div>
                            <div className="val">Long-term Valuation</div>
                            <div className="val">Weekly Highs</div>
                            <div className="val">Weekly Lows</div>
                            <div className="val">Item Type</div>
                        </div>
                        {
                            pageItems.map((item, index) => {
                                return (
                                    <div key={index} className="item-row">
                                        <div className="val">
                                            <Image src={item.item_image_uri} thumbnail />
                                        </div>
                                        <div className="val">{item.item_name}</div>
                                        <div className="val">{item.buy_limit}</div>
                                        <div className="val">{item.prices[item.prices.length - 1]}</div>
                                        <div className="val">{complement(item.cvar_week)}</div>
                                        <div className="val">{complement(item.cvar_month)}</div>
                                        <div className="val">{complement(item.cvar_long_term)}</div>
                                        <div className="val">{percentage(complement(item.valuation_week))}</div>
                                        <div className="val">{percentage(complement(item.valuation_month))}</div>
                                        <div className="val">{percentage(complement(item.valuation_long_term))}</div>
                                        <div className="val">{item.highest_price_week}</div>
                                        <div className="val">{item.lowest_price_week}</div>
                                        {
                                            props.filter === 'type' ? (
                                                <div className="val">{item.item_sub_type}</div>
                                            ) : (
                                                <div className="val">{item.item_type}</div>
                                            )
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                    <Container className="navigation">
                        <Button variant="secondary" className="navButton" onClick={handleFirstPage}>{'<<'}</Button>
                        <Button variant="secondary" className="navButton" onClick={handlePreviousPage}>{'<'}</Button>
                        <input placeholder={page} className="navInput" disabled></input>
                        <Button variant="secondary" className="navButton" onClick={handleNextPage}>{'>'}</Button>
                    </Container>
                </div>
            ) : (
                <div>
                </div>
            )}
        </div>
    );
}

function complement(amount) {
    return (1.0 - amount);
}

function percentage(amount) {
    return 100 * amount;
}
