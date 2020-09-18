import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import api from '../config/api';

export default function Searchbar() {

    const history = useHistory();
    const [searchText, setSearchText] = useState('');

    const handleSearchText = (e) => {
        setSearchText(e.target.value);
    }

    const handleItemSearched = async (e) => {
        e.preventDefault();
        // Implement a blanket search on backend
        await api.get(`/SearchByKeyword/${searchText}`)
        history.push(`/search/${searchText}`);
    }

    return (
        <Form>
            <Form.Group controlId='formSearch'>
                <Form.Control type="text" placeholder="Search for an item..." onChange={handleSearchText}></Form.Control>
                <Button onSubmit={handleItemSearched} type="submit" value="Search"></Button>
            </Form.Group>
        </Form>
    )

}