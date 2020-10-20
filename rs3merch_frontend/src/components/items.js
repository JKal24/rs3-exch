import React, { useEffect, useState } from 'react';
import { Container, Button, Image, Col, Row } from 'react-bootstrap';
import { initInfo, getInfo, } from '../config/commands';
import useFavorites from './hooks/useFavorites';
import starIcon from '../assets/star.png';
import loadingIcon from '../assets/rs3merch_logo_big.png';
import './items.css';

export default function Items(props) {

    const {handleFavorite, isFavorited, favoritesFull, setFavorites} = useFavorites()

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
            await initInfo(props.filter, props.keyword);
            const info = await getInfo(props.filter);
            if (props.landingPage) {
                // If this is the landing page, copy all of the item names into the favorites list
                setFavorites(info.data);
                setDisableNav(true)
            }
            if (info) { setItems(info.data); }
            setLoaded(true);
        }

        setData();
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

    return (
        <>
            {loaded ? (
                <>
                    { items.length > 0 ? (
                        <>
                            <Container>

                                { /* Makes a header for the table of items */}
                                <Row xs="12" sm="12">
                                    <Col className="val" sm="1"></Col>
                                    <Col className="val" sm="1">Item Name</Col>
                                    <Col className="val" sm="1">Buy Limit</Col>
                                    <Col className="val" sm="1">Price</Col>
                                    <Col className="val" sm="1">Monthly Average</Col>
                                    <Col className="val" sm="1">Under-valuation</Col>
                                    <Col className="val" sm="1">Monthly Variation</Col>
                                    <Col className="val" sm="1">Weekly Highs</Col>
                                    <Col className="val" sm="1">Weekly Lows</Col>
                                    <Col className="val" sm="1">Monthly Highs</Col>
                                    <Col className="val" sm="1">Monthly Lows</Col>
                                    <Col className="val" sm="1">Favorite</Col>
                                </Row>
                                {
                                    items.map((item, index) => {
                                        return (
                                            <Row key={index} className="section" xs="12" sm="12">
                                                <Col className="val" sm="1"><Image src={item.item_image_uri} thumbnail></Image></Col>
                                                <Col className="val" sm="1">{item.item_name}</Col>
                                                <Col className="val" sm="1">{item.buy_limit}</Col>
                                                <Col className="val" sm="1">{item.price_today}</Col>
                                                <Col className="val" sm="1">{item.average}</Col>
                                                <Col className="val" sm="1">{item.undervaluation}</Col>
                                                <Col className="val" sm="1">{item.cvar_month}</Col>
                                                <Col className="val" sm="1">{item.highest_price_week}</Col>
                                                <Col className="val" sm="1">{item.lowest_price_week}</Col>
                                                <Col className="val" sm="1">{item.highest_price_month}</Col>
                                                <Col className="val" sm="1">{item.lowest_price_month}</Col>
                                                <Col className="val" sm="1">
                                                    <Button className="fav-button" variant={isFavorited(item.item_name) ? 'success' : 'light'} 
                                                    onClick={() => handleFavorite(item.item_name, item)} disabled={favoritesFull() && !props.landingPage}>
                                                        <Image className="fav-star" src={starIcon} fluid />
                                                    </Button>
                                                </Col>
                                            </Row>
                                        )
                                    })
                                }
                            </Container>
                            <Container className="navigation">
                                <Button variant="secondary" className="navButton" onClick={handleFirstPage} disabled={disableNav}>{'<<'}</Button>
                                <Button variant="secondary" className="navButton" onClick={handlePreviousPage} disabled={disableNav}>{'<'}</Button>
                                <input placeholder={page} onKeyDown={handlePageChange} className="navInput" disabled={disableNav ? "disabled" : ""}></input>
                                <Button variant="secondary" className="navButton" onClick={handleNextPage} disabled={disableNav}>{'>'}</Button>
                            </Container>
                        </>
                    ) : (
                            <h4 className="loading-contents" ><i>There is nothing to show here</i></h4>
                        )}
                </>
            ) : (
                    <div className="loading-contents">
                        <img src={loadingIcon} className="loading" alt="Loading..." />
                    </div>
                )}
        </>
    );
}
