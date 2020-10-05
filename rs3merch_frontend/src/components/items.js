import React, { useEffect, useState } from 'react';
import { Container, Button, Row, Col, Image } from 'react-bootstrap';
import { initInfo, getInfo } from '../config/commands';
import './items.css';

export default function Items(props) {

    // Items are initialized by their respective page (uris are loaded in)
    // Then the items are parsed and displayed here

    const [items, setItems] = useState([]);
    const [loaded, setLoaded] = useState(false);

    // Previous items will be a collection of arrays for each corresponding page
    // Index 0 will represent page 1 and so on...

    const [previousItems, setPreviousItems] = useState([]);
    const [page, setPage] = useState(1);
    const [disableNav, setDisableNav] = useState(false);

    // Items will be loaded in through useEffect the first time, afterwards they will
    // be loaded in through handleNextPage

    useEffect(() => {
        async function setData() {
            await initInfo(props.filter, props.keyword);
            setItems((await getInfo(props.filter)).data);
            setLoaded(true);
        }

        setData();
    }, [props.filter, props.keyword])

    useEffect(() => {
        setDisableNav(false);
    }, [items])

    function copyPage() {
        if (previousItems.length < page) {
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
                    <Container>

                        { /* Makes a header for the table of items */}
                        <Row className="section">
                            <Col className="val"></Col>
                            <Col className="val">Item Name</Col>
                            <Col className="val">Buy Limit</Col>
                            <Col className="val">Price</Col>
                            <Col className="val">Monthly Average</Col>
                            <Col className="val">Undervaluation</Col>
                            <Col className="val">Monthly Variation</Col>
                            <Col className="val">Weekly Highs</Col>
                            <Col className="val">Weekly Lows</Col>
                            <Col className="val">Monthly Highs</Col>
                            <Col className="val">Monthly Lows</Col>
                        </Row>
                        {
                            items.map((item, index) => {
                                return (
                                    <Row key={index} className="section">
                                        <Col className="val">{index + 1}</Col>
                                        <Col className="val"><Image src={item.item_image_uri} thumbnail></Image>{item.item_name}</Col>
                                        <Col className="val">{item.buy_limit}</Col>
                                        <Col className="val">{item.price_today}</Col>
                                        <Col className="val">{item.average}</Col>
                                        <Col className="val">{item.undervaluation}</Col>
                                        <Col className="val">{item.cvar_month}</Col>
                                        <Col className="val">{item.highest_price_week}</Col>
                                        <Col className="val">{item.lowest_price_week}</Col>
                                        <Col className="val">{item.highest_price_month}</Col>
                                        <Col className="val">{item.lowest_price_month}</Col>
                                    </Row>
                                )
                            })
                        }
                    </Container>
                    <Container className="navigation">
                        <Button variant="secondary" className="navButton" onClick={handleFirstPage} disabled={disableNav}>{'<<'}</Button>
                        <Button variant="secondary" className="navButton" onClick={handlePreviousPage} disabled={disableNav}>{'<'}</Button>
                        <input placeholder={page} onKeyDown={handlePageChange} className="navInput"></input>
                        <Button variant="secondary" className="navButton" onClick={handleNextPage} disabled={disableNav}>{'>'}</Button>
                    </Container>
                </>
            ) : (
                    <h4>Loading...</h4>
                    // Add a loading animation?
                )}
        </>
    );
}
