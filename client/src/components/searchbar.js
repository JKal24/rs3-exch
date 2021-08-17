import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Nav, Tab, Row, Tabs, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toggleFocus, changeTab } from '../app/reducers/search';
import { Menu, Search } from 'react-feather';
import Filters from './filter';
import logoIcon from '../assets/rs3exch_nav_logo.png';
import '../spreadsheets/nav.css';

export default function Searchbar() {

    const [keyword, setKeyword] = useState('');

    const focus = useSelector(state => state.search.focus);
    const tabKey = useSelector(state => state.search.key);

    const dispatch = useDispatch();

    const filterKeywords = useSelector(state => state.search.filterKeywords);
    const filterPrice = useSelector(state => state.search.filterPrice);
    const filterTypes = useSelector(state => state.search.filterTypes);
    const filterMaxBuyLimit = useSelector(state => state.search.filterMaxBuyLimit);
    const filterMinBuyLimit = useSelector(state => state.search.filterMinBuyLimit);

    const handleSearchLink = (e) => {
        if (e.key === 'Enter' && focus) {
            handleManualLink();
        }
    }

    const handleManualLink = () => {
        if (tabKey === 'filter') {
            const concatKeywords = [keyword].concat(filterKeywords);
            
            window.location.assign(`/filter/${concatKeywords}/${filterPrice}/${filterMaxBuyLimit}/${filterMinBuyLimit}/${filterTypes}`);
        } else {
            window.location.assign(`/search/${keyword}`);
        }
    }

    return (
        <div className="search" id="right">
            <Tab.Container defaultActiveKey="" activeKey={tabKey} onSelect={key => dispatch(changeTab(key))}>
                <Row>
                    <Link to='/' className="alternate-header">
                        <Image src={logoIcon} className="header-image" />
                    </Link>

                    <input type="text" className='search-box' placeholder="Search for an item..."
                        onKeyUp={handleSearchLink} onChange={e => setKeyword(e.target.value)}
                        onFocus={() => dispatch(toggleFocus())} onBlur={() => dispatch(toggleFocus())} />

                    <button className="search-button" onClick={handleManualLink}>
                        <Search /> 
                    </button>
                    <Nav>
                        <Nav.Item>
                            <Nav.Link eventKey="filter" className='filter-tab'><Menu></Menu></Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Row>
                <Row>
                    <Tabs defaultActiveKey="" activeKey={tabKey} onSelect={key => dispatch(changeTab(key))}>
                        <Tab eventKey="filter">
                            <Filters />
                        </Tab>
                    </Tabs>
                </Row>
            </Tab.Container>
        </div>
    )
}
