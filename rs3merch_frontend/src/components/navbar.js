import React from 'react';
import { Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import SelectType from './selectType';
import SelectBuyLimit from './selectBuyLimit';
import logoIcon from '../assets/rs3merch_logo.png';

export default function Navigation() {

    return (
        <div className="left-container">
            <div className="header">
                <Link to='/'>
                    <Image src={logoIcon} fluid />
                </Link>
            </div>
            <h3 className='nav-title'>Filters</h3>
            <Button variant="dark" className='nav'>
                <Link to='/invest'>Investments</Link>
            </Button>
            <Button variant="dark" className='nav'>
                <Link to='/stable'>Stable Items</Link>
            </Button>
            <SelectBuyLimit className='nav'/>
            <SelectType className='nav'> </SelectType>
        </div>
    )
}