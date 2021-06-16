import React, { useEffect, useState } from 'react';
import { Container, Button, Image } from 'react-bootstrap';
import { initInfo, getInfo, getGraph, getFavorites, manual_cancelToken } from '../config/commands';
import format from '../config/format';
import useFavorites from './hooks/useFavorites';
import starIcon from '../assets/star.png';
import loadingIcon from '../assets/rs3merch_logo_big.png';
import './items.css';

export default function Items(props) {

    const { handleFavorite, isFavorited, favoritesFull, setFavorites } = useFavorites()

    // Items are initialized by their respective page (uris are loaded in)
    // Then the items are parsed and displayed here

    const [items, setItems] = useState([]);
    const [previousItems, setPreviousItems] = useState([]);
    const [loaded, setLoaded] = useState(false);

    // Previous items will be a collection of arrays for each corresponding page
    // Index 0 will represent page 1 and so on...

    const [page, setPage] = useState(1);
    const [disableNav, setDisableNav] = useState(false);

    /** 
     * Items will be loaded in through useEffect the first time, 
     * afterwards they will be loaded in through handleNextPage
     * Favorites will be tracked and disabled if the limit is met
     */

    useEffect(() => {
        async function setData() {
            try {
                const favorites = await getFavorites();
                const initialize_items = await initInfo(props.filter, props.keyword);

                if (initialize_items) {
                    // Gets the items from the uri database
                    
                    setItems((await getInfo(props.filter)).data);
                } else {
                    // Otherwise, if on landing page, the items will be set to favorites and displayed

                    setItems(favorites.data);
                    setDisableNav(true)
                }

                setFavorites(favorites.data);
                setLoaded(true);
            } catch (err) {
                return;
            }
        }

        setData();

        return () => { manual_cancelToken(); }
    }, [props.filter, props.keyword, props.landingPage, setFavorites])

    function copyPage() {
        if (previousItems.length <= page) {
            // Copies current items as an array on to the total items
            const currentItems = previousItems.concat([items]);
            setPreviousItems(currentItems);
            return true;
        }
        return false;
    }

    function handleFirstPage() {
        if (page > 1) {
            setDisableNav(true);
            copyPage();
            setItems(previousItems[0]);
            setPage(1);
        }
    }

    function handlePreviousPage() {
        if (page > 1) {
            setDisableNav(true);
            copyPage();
            setItems(previousItems[page - 2]);
            setPage(page - 1);
        }
    }

    function handlePageChange(e) {
        if (e.key === 'Enter' && e.target.value < previousItems.length) {
            const newPage = parseInt(e.target.value);

            if (newPage <= previousItems.length && newPage > 0) {
                copyPage();
                setItems(previousItems[newPage - 1]);
                setPage(newPage);
            }
        }
    }

    async function handleNextPage() {
        setDisableNav(true);
        if (copyPage()) {
            // Gets a new set of items to replace the ones on display
            const newItems = (await getInfo(props.filter)).data
            setItems(newItems);
        } else {
            setItems(previousItems[page])
        }
        setPage(page + 1);
    }

    async function handleGraph(item_id, item_name) {
        return await getGraph(item_id, item_name);
    }

    return (
        <>
            {loaded ? (
                <>
                    { items.length > 0 ? (
                        <>
                            <div className="item-table">

                                { /* Makes a header for the table of items, creates plotting column if enabled */}
                                <div className="item-row">
                                    {props.plots ? (
                                        <>
                                            <div className="val">Plots</div>
                                        </>
                                    ) : (
                                            <>
                                                <div className="val"></div>
                                            </>
                                        )
                                    }
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
                                    items.map((item, index) => {
                                        return (
                                            <div key={index} className="item-row">

                                                { /* If plotting is enabled, each item has a button to open a plot in a seperate window */}
                                                { props.plots ? (
                                                    <>
                                                        <div className="val">
                                                            <Button variant="light" onClick={() => handleGraph(item.item_id, item.item_name)}>
                                                                <Image src={item.item_image_uri} thumbnail />
                                                            </Button>
                                                        </div>
                                                    </>
                                                ) : (
                                                        <>
                                                            <div className="val">
                                                                <Image src={item.item_image_uri} thumbnail />
                                                            </div>
                                                        </>
                                                    )

                                                }
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
                                                <div className="val">
                                                    <Button className="fav-button" variant={isFavorited(item.item_name) ? 'success' : 'light'}
                                                        onClick={() => handleFavorite(item)} disabled={favoritesFull() && !props.landingPage}>
                                                        <Image className="fav-star" src={starIcon} fluid />
                                                    </Button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <Container className="navigation">
                                <Button variant="secondary" className="navButton" onClick={handleFirstPage} disabled={disableNav}>{'<<'}</Button>
                                <Button variant="secondary" className="navButton" onClick={handlePreviousPage} disabled={disableNav}>{'<'}</Button>
                                <input placeholder={page} onKeyDown={handlePageChange} className="navInput" disabled={disableNav ? "disabled" : ""}></input>
                                <Button variant="secondary" className="navButton" onClick={handleNextPage} disabled={disableNav}>{'>'}</Button>
                            </Container>
                        </>
                    ) : (
                            <h4 className="loading-contents" ><i>There is nothing to show here</i></h4>
                        )
                    }
                </>
            ) : (
                    <div className="loading-contents">
                        <img src={loadingIcon} className="loading" alt="Loading..." />
                    </div>
                )}
        </>
    );
}
