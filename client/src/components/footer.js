import React from 'react';
import { Link } from 'react-router-dom';
import '../spreadsheets/nav.css';

export default function Bottom() {
    return (
        <div className="footer-link-container">
            <Link to="/Questions" className="footer-link">Questions </Link>
            <Link to="/Acknowledgements" className="footer-link">Acknowledgements</Link>
        </div>
    )
}
