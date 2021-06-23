import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

export default function Searchbar(props) {

    const [focus, setFocus] = useState(false);

    const handleSearchLink = (e) => {
        if (e.key === 'Enter' && focus) {
            window.location.assign(`/search/${e.target.value}`)
        }
    }

    return (
        <div className='search'>
            <Row>
                <Col sm="5">
                    <input type="text" className='search-box' placeholder="Search for an item..." 
                    onKeyUp={handleSearchLink} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}></input>
                </Col>
            </Row>
        </div>
    )

}