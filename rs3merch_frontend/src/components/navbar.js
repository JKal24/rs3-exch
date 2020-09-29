import React from 'react';
import { Navbar, Container, Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import SelectType from './selectType';
import SelectBuyLimit from './selectBuyLimit';

export default function Navigation() {

    return (
        <Navbar>
            <Container>
                <Link to='/'>
                    <Image src="assets/rs3merch_logo.png" fluid />
                </Link>
                <SelectBuyLimit />
                <Button variant="dark">
                    <Link to='/invest'>Investments</Link>
                </Button>
                <Button variant="dark">
                    <Link to='/stable'>Stable Items</Link>
                </Button>
                <SelectType />
            </Container>
        </Navbar>
    )
}