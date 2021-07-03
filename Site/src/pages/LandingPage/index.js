import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'react-feather';
import Items from '../../components/items';
import '../../spreadsheets/landing.css';

export default function LandingPage() {

    return (
        <div className="contents">
            <h2 className="contents-title">Runescape Grand Exchange Item Information</h2>
            <div className="landing-data">
                <h4 className="welcome-title">Welcome to RS3Exch</h4>
                <p>
                This app was built to track items on the Grand Exchange in Runescape (Runescape 3, not Old School).
                This app can be used for looking at statistics of various items, as well as their feasability in being traded for a profit.
                This tool is not as powerful as some of the tools built for Old School Runescape primarily because Runescape 3 does not have
                a custom client with which to collect data from users. <br/> Therefore, all data is collected through the official Runescape API and 
                additionally, initial item descriptions are scraped from <Link to='https://runescape.wiki/'>https://runescape.wiki/<ExternalLink/></Link>. 
                This app is not intended for commercial use.<br/>
                <div className="future-info">*Graphs for item prices will be implemented soon</div>
                </p>
            </div>
            <Items />
        </div>
    )
}
