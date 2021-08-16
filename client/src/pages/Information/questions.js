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
            <h3>Why is updating inactive?</h3>
            <p>
                With Heroku I could setup heroku scheduler to update the data everyday however using the Runescape API to collect
                large amounts of data is abysmal. I've limited my access to only collecting prices meaning I have to make 1 call per
                item but it still takes hours to complete because there is a throttle of 5-10 seconds between requests.
                The dyno hours it would cost isn't enough to keep it running constantly.
                If you are a passerby from my github or someone I showed this to, you can run this app on your own device with
                the source code at <a href='https://github.com/JKal24/rs3-exch'>https://github.com/JKal24/rs3-exch.</a>
            </p>
        </div>
    )
}