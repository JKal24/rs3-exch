import React from 'react';
import { InputGroup, FormControl, Form} from 'react-bootstrap';
import { useSelector } from 'react-redux';

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
                    <FormControl
                        placeholder="Enter extra keywords separated by commas..."
                        aria-label="Keyword"
                    />
                </InputGroup>

                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>Price</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="Price greater than 0, 500, >1000..."
                        aria-label="Price"
                    />
                </InputGroup>
            </Form.Group>
            <Form.Group className='filter-column'>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>Buy Limit Max</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="0, 100, 200, >500..."
                        aria-label="Buylimit"
                    />
                </InputGroup>

                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>Buy Limit Min</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="500, 200, 100, <0..."
                        aria-label="Buylimit"
                    />
                </InputGroup>
            </Form.Group>
            {
                loaded &&
                <Form.Group className="filter-checkbox">
                    {
                        types.map((type, index) => {
                            return (
                                <Form.Check
                                    key={index}
                                    type={'checkbox'}
                                    id={`custom-${type}`}
                                    label={`${type.replace('_', ' ')}`}
                                    className="filter-type"
                                />
                            )
                        })
                    }
                </Form.Group>
            }
        </Form>
    )
}