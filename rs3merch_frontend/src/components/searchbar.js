import React, { useState } from 'react';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Searchbar() {

    const [keyword, setKeyword] = useState('');

    const handleSearchText = (e) => {
        setKeyword(e.target.value);
    }

    return (
        <Form className='search'>
            <Container>
                <Row>
                    <Col>
                        <Form.Group controlId='formSearch'>
                            <Form.Control type="text" placeholder="Search for an item..." onChange={handleSearchText}></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Button variant="dark"><Link className='searchText' to={{ pathname: `/search/${keyword}`}}>Search</Link></Button>
                    </Col>
                </Row>
            </Container>
        </Form>
    )

}