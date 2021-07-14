import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Nav, Tab, Row, Tabs, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toggleFocus, changeTab } from '../app/reducers/search';
import Menu from 'react-feather/dist/icons/menu';
import Filters from './filter';
import logoIcon from '../assets/rs3exch_nav_logo.png';
import '../spreadsheets/nav.css';

export default function Searchbar() {

    const focus = useSelector(state => state.search.focus);
    const tabKey = useSelector(state => state.search.key);

    const dispatch = useDispatch();

    const handleSearchLink = (e) => {
        if (e.key === 'Enter' && focus) {
            window.location.assign(`/search/${e.target.value}`)
        }
    }

    return (
        <div className="search">
            <Tab.Container defaultActiveKey="" activeKey={tabKey} onSelect={key => dispatch(changeTab(key))}>
                <Row>
                    <div className="alternate-header">
                        <Link to='/'>
                            <Image src={logoIcon} className="header-image" />
                        </Link>
                    </div>
                    <input type="text" className='search-box' placeholder="Search for an item..."
                        onKeyUp={handleSearchLink} onFocus={() => dispatch(toggleFocus())} onBlur={() => dispatch(toggleFocus())}></input>
                    <Nav>
                        <Nav.Item>
                            <Nav.Link eventKey="filter" className='filter-tab'><Menu></Menu></Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Row>
                <Row>
                    <Tabs defaultActiveKey="" activeKey={tabKey} onSelect={key => dispatch(changeTab(key))}>
                        <Tab eventKey="filter">
                            <Filters className="filter" />
                        </Tab>
                    </Tabs>
                </Row>
            </Tab.Container>
        </div>
    )
}
