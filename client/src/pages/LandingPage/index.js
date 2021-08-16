import React, { useEffect } from 'react';
import { ExternalLink } from 'react-feather';
import { useDispatch } from 'react-redux';
import { updateItems } from '../../app/reducers/items';
import Items from '../../components/items';
import '../../spreadsheets/info.css';

export default function LandingPage() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateItems());
    }, [dispatch])

    return (
        <div className="contents">
            <h2 className="contents-title">Runescape Grand Exchange Item Information</h2>
            <div className="info-data">
                <h4 className="welcome-title">Welcome to RS3Exch</h4>
                <p>
                This app was built to track items on the Grand Exchange in Runescape (Runescape 3, not Old School).
                This app can be used for looking at statistics of various items, as well as their feasability in being traded for a profit. <br/> 
                All data is collected through the official Runescape API and additionally, initial item descriptions are scraped from
                <a href='https://runescape.wiki/'> https://runescape.wiki/ <ExternalLink/></a><br/>
                This app is not intended for commercial use.<br/>
                </p>
                <div className="future-info">*Graphs for item prices may be implemented at a later date</div>
            </div>
            <Items />
        </div>
    )
}
