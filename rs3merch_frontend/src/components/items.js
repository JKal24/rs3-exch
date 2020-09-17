import { React, useEffect, useState, useParams } from 'react';
import api from '../../config/api';

export default function Items(props) {

    // Items are initialized by their respective page (uris are loaded in)
    // Then the items are parsed and displayed here
    const [items, setItems] = useState([]);
    const [loaded, setLoaded] = useState(false);

    // Previous items will be a collection of arrays for each corresponding page
    // Index 0 will represent page 1 and so on...
    const [previousItems, setPreviousItems] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(async () => {
        setItems(await api.getInfo(props.filter));
        setLoaded(true);
    }, [])

    async function handleFirstPage() {
        if (page >= previousItems.length) {
            setPreviousItems(previousItems.push(items));
        }

        setPage(1);
        setItems(previousItems[0]);
    }

    async function handlePreviousPage() {
        if (page >= previousItems.length) {
            setPreviousItems(previousItems.push(items));
        }

        setPage(page - 1);
        setItems(previousItems[page - 1]);
    }

    async function handlePageChange(e) {
        if (e.key == 'Enter' && e.target.value < previousItems.length) {
            if (page >= previousItems.length) {
                setPreviousItems(previousItems.push(items));
            }

            setPage(e.target.value);
            setItems(previousItems[page - 1]);
        }
    }

    async function handleNextPage() {
        setPage(page + 1);
        if (previousItems.length < page) {
            setPreviousItems(previousItems.push(items));

            setItems(await api.getInfo(props.filter));
        }
    }

    return (
        <>
            {loaded ? (
                <>
                    <Container>

                        { /* Make a header for the table of items */}
                        <Row>
                            <Col></Col>
                            <Col>Item Name</Col>
                            <Col>Buy Limit</Col>
                            <Col>Price</Col>
                            <Col>Monthly Average</Col>
                            <Col>Undervaluation</Col>
                            <Col>Monthly Variation</Col>
                            <Col>Weekly Highs</Col>
                            <Col>Weekly Lows</Col>
                            <Col>Monthly Highs</Col>
                            <Col>Monthly Lows</Col>
                        </Row>
                        {
                            props.items.map((item, index) => {
                                return (
                                    <Row>
                                        <Col>{index}</Col>
                                        <Col><Image src={item.item_image_uri} thumbnail></Image>{item.item_name}</Col>
                                        <Col>{item.buy_limit}</Col>
                                        <Col>{item.price_today}</Col>
                                        <Col>{item.average}</Col>
                                        <Col>{item.undervaluation}</Col>
                                        <Col>{item.cvar_month}</Col>
                                        <Col>{item.highest_price_week}</Col>
                                        <Col>{item.lowest_price_week}</Col>
                                        <Col>{item.highest_price_month}</Col>
                                        <Col>{item.lowest_price_month}</Col>
                                    </Row>
                                )
                            })
                        }
                    </Container>
                    <div class="navigation">
                        <Button variant="secondary" value="<<" class="navButton" onClick={handleFirstPage}></Button>
                        <Button variant="secondary" value="<" class="navButton" onClick={handlePreviousPage}></Button>
                        <input placeholder={page} onKeyDown={handlePageChange}></input>
                        <Button variant="secondary" value=">" class="navButton" onClick={handleNextPage}></Button>
                    </div>
                </>
            ) : (
                    <h4>Loading...</h4>
                    // Add a loading animation?
                )}
        </>
    );
}