import { React, useState } from 'react';
import { Navbar, Container, Collapse } from 'react-bootstrap'
import SelectType from './selectType';
import SelectBuyLimit from './selectBuyLimit';

export default function Navbar() {

    const [open, setOpen] = useState(true);

    return (
        <div>
            <Navbar>
                <Container>
                    <Button onclick={() => setOpen(!open)}></Button>
                    <Collapse in={open}>
                        <Link>
                            <Image src="../assets/rs3merch_logo" fluid />
                        </Link>
                        <SelectBuyLimit />
                        <Link to='/invest'>Investments</Link>
                        <Link to='/stable'>Stable Items</Link>
                        <SelectType />
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    )
}