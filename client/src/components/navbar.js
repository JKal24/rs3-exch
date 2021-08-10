import React from 'react';
import { Button } from 'react-bootstrap'
import SelectType from './type';
import SelectBuyLimit from './buylimit';
import '../spreadsheets/nav.css';

export default function Navigation() {

    return (
        <div id="left">
            <Button variant="dark" className='link-nav'>
                <a href='/rising'>Rising in Price</a>
            </Button>

            <Button variant="dark" className='link-nav'>
                <a href='/falling'>Falling in Price</a>
            </Button>

            <SelectBuyLimit/>
            <SelectType/>
        </div>
    )
}