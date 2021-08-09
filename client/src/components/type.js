import React, { useEffect } from 'react';
import { Collapse, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createTypes, toggleOpenTypes } from '../app/reducers/nav';

export default function SelectType() {

    const dispatch = useDispatch();

    const types = useSelector(state => state.nav.types);
    const open = useSelector(state => state.nav.openTypes);
    const loaded = useSelector(state => state.nav.loadedTypes);

    useEffect(() => {
        dispatch(createTypes());
    }, [dispatch])

    function handleTypes(e) {
        e.preventDefault();
        dispatch(toggleOpenTypes());
    }

    return (
        <div>
            <Button className='link-nav' variant="dark" onClick={handleTypes} aria-controls="types" aria-expanded={open}>
                Types
            </Button>
            {
                loaded ? (
                    <Collapse in={open}>
                        <div id="types">
                            <div>
                                {
                                    // Listing of each type

                                    types.map((type, index) => {
                                        return (
                                            <div key={index} className='link-nav-container'>
                                                <a href={`/type/${type}`} key={index} className='link-nav-text'>
                                                    {type.replace('_', ' ')}
                                                </a>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </Collapse>
                ) : (
                    <div>
                    </div>
                )
            }

        </div>
    )

}