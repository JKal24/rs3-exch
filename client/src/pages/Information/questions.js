import React from 'react';
import '../../spreadsheets/info.css';

export default function Questions() {
    return (
        <div className='info-data'>
            <h3>Why is data updated so slow?</h3>
            <p>
                Unlike Old School Runescape, there is no custom client for Runescape 3 and as a result there is no easy
                way to track the grand exchange prices as they are fluctuating. <br/>
                Therefore, most exchange data is obtained from the official Runescape API which is updated every 20 to 28 hours.
            </p>
            <h3>---</h3>
        </div>
    )
}