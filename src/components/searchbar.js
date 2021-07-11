import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFocus } from '../app/reducers/search';
import '../spreadsheets/nav.css';

export default function Searchbar() {

    const focus = useSelector(state => state.search.focus);

    const dispatch = useDispatch();

    const handleSearchLink = (e) => {
        if (e.key === 'Enter' && focus) {
            window.location.assign(`/search/${e.target.value}`)
        }
    }

    return (
        <div className="search">
            <input type="text" className='search-box' placeholder="Search for an item..."
                onKeyUp={handleSearchLink} onFocus={() => dispatch(toggleFocus())} onBlur={() => dispatch(toggleFocus())}></input>
        </div>
    )
}
