import React from 'react';
import { Link } from 'react-router-dom';
import '../spreadsheets/nav.css';

export default function Bottom() {
    return (
        <div className="end-contents">
            <Acknowledgements></Acknowledgements>
        </div>
    )
}

function Acknowledgements() {
    return (
        <div className="acknowledgements">
            <Link to="/Acknowledgements">Acknowledgements</Link>
        </div>
    )
}