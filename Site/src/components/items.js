import React, { useEffect } from 'react';
import { Container, Button, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { refresh, incrementPage, decrementPage, setFirstPage, readItems } from '../redux/reducers/items';
import { clearCancelToken } from '../data/commands';
import format from '../config/format';
import loadingIcon from '../assets/rs3merch_logo_big.png';
import './items.css';

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
        dispatch(readItems( { filter: props.filter, param: props.param }));

        return () => {
            clearCancelToken();
            dispatch(refresh());
        }
    }, [props.filter, props.param])

    function handleFirstPage() {
        dispatch(setFirstPage());
    }

    function handlePreviousPage() {
        dispatch(decrementPage());
    }

    async function handleNextPage() {
        dispatch(incrementPage());
    }

    return (
        <>
            { loaded ? (
                <div>
                    <div className="item-table">

                        { /* Makes a header for the table of items */}
                        <div className="item-row">
                            <div className="val"></div>
                            <div className="val">Item Name</div>
                            <div className="val">Buy Limit</div>
                            <div className="val">Price</div>
                            <div className="val">Monthly Average</div>
                            <div className="val">Under-valuation</div>
                            <div className="val">Monthly Variation</div>
                            <div className="val">Weekly Highs</div>
                            <div className="val">Weekly Lows</div>
                            <div className="val">Monthly Highs</div>
                            <div className="val">Monthly Lows</div>
                            <div className="val">Favorite</div>
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
                                        <div className="val">{format(item.price_today)}</div>
                                        <div className="val">{format(item.average)}</div>
                                        <div className="val">{item.undervaluation}</div>
                                        <div className="val">{item.cvar_month}</div>
                                        <div className="val">{format(item.highest_price_week)}</div>
                                        <div className="val">{format(item.lowest_price_week)}</div>
                                        <div className="val">{format(item.highest_price_month)}</div>
                                        <div className="val">{format(item.lowest_price_month)}</div>
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
                <div className="loading-contents">
                    <img src={loadingIcon} className="loading" alt="Loading..." />
                </div>
            )}
        </>
    );
}
