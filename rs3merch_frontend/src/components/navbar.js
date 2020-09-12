import React from 'react';
import { Navbar, Container, Collapse } from 'react-bootstrap'
import { Link } from 'react-router-dom';

export default function Navbar() {

    return (
        <div>
            <Navbar>
                <Container>
                    <Button onclick={handleCollapse}></Button>
                    <Collapse>
                        <Image src="../assets/rs3merch_logo" fluid></Image>
                        <div class="buy_limit">
                            <Link to='/buy_limit/search/VERY_LOW'>Very Low</Link>
                            <Link to='/buy_limit/search/LOW'>Low</Link>
                            <Link to='/buy_limit/search/MED'>Medium</Link>
                            <Link to='/buy_limit/search/HIGH'>High</Link>
                        </div>
                        <Link to='/invest/search'>Investment Items</Link>
                        <Link to='/stable/search'>Stable Items</Link>
                        <Link to='/type/select'>Items by Type</Link>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    )
}