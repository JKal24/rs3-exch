import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'react-feather';
import Items from '../../components/items';
import '../../spreadsheets/info.css';

export default function LandingPage() {

    return (
        <div className="contents">
            <h2 className="contents-title">Runescape Grand Exchange Item Information</h2>
            <div className="info-data">
                <h4 className="welcome-title">Welcome to RS3Exch</h4>
                <p>
                This app was built to track items on the Grand Exchange in Runescape (Runescape 3, not Old School).
                This app can be used for looking at statistics of various items, as well as their feasability in being traded for a profit. <br/> 
                All data is collected through the official Runescape API and additionally, initial item descriptions are scraped from 
                <Link to='https://runescape.wiki/'> https://runescape.wiki/<ExternalLink/></Link>. 
                This app is not intended for commercial use.<br/>
                </p>
                <div className="future-info">*Graphs for item prices will be implemented soon</div>
            </div>
            <Items />
        </div>
    )
}
