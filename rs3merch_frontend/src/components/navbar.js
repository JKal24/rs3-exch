import React from 'react';
import { Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import SelectType from './selectType';
import SelectBuyLimit from './selectBuyLimit';
import logoIcon from '../assets/rs3merch_logo.png';
import './navbar.css';

export default function Navigation() {

    return (
        <div className="left-container">
            <div className="header">
                <h3>Filters</h3>
                <Link to='/'>
                    <Image src={logoIcon} fluid />
                </Link>
            </div>
            <Button variant="dark" className='item'>
                <Link to='/invest'>Investments</Link>
            </Button>
            <Button variant="dark" className='item'>
                <Link to='/stable'>Stable Items</Link>
            </Button>
            <SelectBuyLimit className='item'/>
            <SelectType className='item'> </SelectType>
        </div>
    )
}