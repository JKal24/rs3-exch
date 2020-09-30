import React, { useState, useEffect } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import api from '../config/api';

export default function SelectType(props) {

    const [types, setTypes] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        async function handleTypes() {
            setTypes((await api.get('/TypeListing')).data);
        }

        handleTypes();
        setLoaded(true);
    }, [])

    // Listing of each type

    const Types = () => {
        return (
            <>
                {
                    loaded ?
                        types.map((type, index) => {
                            return (
                                <Dropdown.Item href={`/type/${type}`} key={index}>
                                    {type}
                                </Dropdown.Item>
                            );
                        })
                        :
                        <h3>Loading...</h3>
                }
            </>
        )
    }

    return (
        <div>
            <DropdownButton title="Types" variant="dark" className={props.className}>
                <Types />
            </DropdownButton>
        </div>
    )

}