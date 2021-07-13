import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Nav, Tab, Row, Tabs } from 'react-bootstrap';
import { toggleFocus, changeTab } from '../app/reducers/search';
import Filters from './filter';
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
        <div className="search">
            <Tab.Container defaultActiveKey="" activeKey={key} onSelect={key => dispatch(changeTab(key))}>
                <Row>
                    <input type="text" className='search-box' placeholder="Search for an item..."
                        onKeyUp={handleSearchLink} onFocus={() => dispatch(toggleFocus())} onBlur={() => dispatch(toggleFocus())}></input>
                    <Nav>
                        <Nav.Item>
                            <Nav.Link eventKey="filter" className='filter-tab'>FILTERS</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Row>
                <Row>
                    <Tabs defaultActiveKey="" activeKey={key} onSelect={key => dispatch(changeTab(key))}>
                        <Tab eventKey="filter">
                            <Filters className="filter" />
                        </Tab>
                    </Tabs>
                </Row>
            </Tab.Container>
        </div>
    )
}
