import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Searchbar(props) {

    const [keyword, setKeyword] = useState('');

    const handleSearchText = (e) => {
        setKeyword(e.target.value);
    }

    const handleSearchLink = (e) => {
        if (e.key === 'Enter') {
            window.location.assign(`/search/${e.target.value}`)
        }
    }

    return (
        <div className='search'>
            <Row>
                <Col sm="5">
                    <input type="text" className='search-box' placeholder="Search for an item..." onChange={handleSearchText} onKeyUp={handleSearchLink}></input>
                </Col>
                <Col sm="2">
                    <Button variant="dark"><Link className='searchText' to={{ pathname: `/search/${keyword}` }}>Search</Link></Button>
                </Col>
            </Row>
        </div>
    )

}