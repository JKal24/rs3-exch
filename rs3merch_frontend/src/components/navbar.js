import React, { useState } from 'react';
import { Navbar, Container, Collapse, Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import SelectType from './selectType';
import SelectBuyLimit from './selectBuyLimit';

export default function Navigation() {

    const [open, setOpen] = useState(false);

    return (
        <Navbar>
            <Container>
                <Button onclick={() => setOpen(!open)}></Button>
                    <Link>
                        <Image src="../assets/rs3merch_logo" fluid />
                    </Link>
                    <SelectBuyLimit />
                    <Link to='/invest'>Investments</Link>
                    <Link to='/stable'>Stable Items</Link>
                    <SelectType />
            </Container>
        </Navbar>
    )
}