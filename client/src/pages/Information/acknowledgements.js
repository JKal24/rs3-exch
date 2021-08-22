import React from 'react';
import { Image } from 'react-bootstrap';
import '../../spreadsheets/info.css';
import wikiIcon from '../../assets/Runescape_wiki_logo.png';
import jagexIcon from '../../assets/Jagex_Logo.png';

export default function Acknowledgements() {
    return (
        <div className='acknowledgement-data'>
            <div className="acknowledgement">
                <Image src={wikiIcon} className="acknowledgement-image" fluid></Image>
                <h4 className="acknowledgement-details">
                    For providing initial data and information relating to Runescape.
                </h4>
            </div>
            <div className="acknowledgement">
                <Image src={jagexIcon} className="acknowledgement-image" fluid></Image>
                <h4 className="acknowledgement-details">
                    For creating the game known as Runescape.
                </h4>
            </div>
        </div>
    )
}