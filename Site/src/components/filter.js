import React from 'react';
import { InputGroup, FormControl, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import '../spreadsheets/nav.css';

export default function Filters() {

    const types = useSelector(state => state.nav.types);
    const loaded = useSelector(state => state.nav.loadedTypes);

    return (
        <Form className='filter-container'>
            <Form.Group className='filter-column'>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>Keywords</InputGroup.Text>
                    </InputGroup.Prepend>
                </InputGroup>
                <FormControl
                    placeholder="Enter keywords separated by commas..."
                    aria-label="Keyword"
                    aria-describedby="basic-keyword"
                    className=""
                />
            </Form.Group>
            <Form.Group className='filter-column'>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>Buylimit Max</InputGroup.Text>
                    </InputGroup.Prepend>
                </InputGroup>
                <FormControl
                    placeholder="0, 100, 200, >500..."
                    aria-label="Upvotes"
                    aria-describedby="basic-upvote"
                />
            </Form.Group>
            {
                loaded &&
                <Form.Group>
                    {
                        types.map((type, index) => {
                            return (
                                <Form.Check
                                    key={index}
                                    custom
                                    type={type}
                                    id={`custom-${type}`}
                                    label={`${type}`}
                                />
                            )
                        })
                    }
                </Form.Group>
            }

        </Form>

    )
}