import React from 'react';
import { Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import SelectType from './type';
import SelectBuyLimit from './buylimit';
import logoIcon from '../assets/rs3exch_nav_logo.png';
import '../spreadsheets/nav.css';

export default function Navigation(props) {

    return (
        <div className={props.class}>
            <div className="header navbar">
                <Link to='/'>
                    <Image src={logoIcon} className="header-image" />
                </Link>
            </div>

            <h4 className="navbar-title">Filters</h4>

            <Button variant="dark" className='link-nav'>
                <a href='/rising'>Rising in Price</a>
            </Button>

            <Button variant="dark" className='link-nav'>
                <a href='/falling'>Falling in Price</a>
            </Button>

            <SelectBuyLimit />
            <SelectType />
        </div>
    )
}