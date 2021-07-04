import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Nav, Tab, Button } from 'react-bootstrap';
import { toggleFocus, changeTab } from '../app/reducers/search';
import '../spreadsheets/nav.css';

export default function Searchbar() {

    const focus = useSelector(state => state.search.focus);
    const key = useSelector(state => state.search.key);

    const dispatch = useDispatch();

    const handleSearchLink = (e) => {
        if (e.key === 'Enter' && focus) {
            window.location.assign(`/search/${e.target.value}`)
        }
    }

    return (
        <Tab.Container className='search'>
            <Row>
                <Col sm={3}>
                    <input type="text" className='search-box' placeholder="Search for an item..."
                        onKeyUp={handleSearchLink} onFocus={() => dispatch(toggleFocus())} onBlur={() => dispatch(toggleFocus())}></input>
                </Col>
                <Col>
                    <div>
                        <div eventKey="filter"><Button>Filters</Button></div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Tab.Content>
                    <Tab.Pane eventKey="filter">
                        --In construction--
                    </Tab.Pane>
                </Tab.Content>
            </Row>
        </Tab.Container>

    )
}

const Filters = () => {
    return (
        <div>
            Content
        </div>
    )
}