import React, { useEffect } from 'react';
import { Container, Button, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { refresh, readItems, refreshItems, readDefaultPageLimit } from '../app/reducers/items';
import { useTable, usePagination } from 'react-table';
import { valuation, variation } from './utils/num';
import '../spreadsheets/items.css';

export default function Items(props) {

    const dispatch = useDispatch();

    const contents = useSelector(state => state.items.contents);
    const loaded = useSelector(state => state.items.loaded);

    useEffect(() => {
        dispatch(readDefaultPageLimit());
        dispatch(readItems({ filter: props.filter, param: props.keyword }));

        return () => {
            dispatch(refreshItems());
            dispatch(refresh());
        }
    }, [props.filter, props.keyword, dispatch])

    const typeString = (props.filter === 'type' ? 'item_sub_type' : 'item_type');

    const columns = React.useMemo(() => [{
        Header: '',
        accessor: 'item_image_uri'
    }, {
        Header: 'Item Name',
        accessor: 'item_name'
    }, {
        Header: 'Buy Limit',
        accessor: 'buy_limit'
    }, {
        Header: 'Price',
        accessor: 'prices'
    }, {
        Header: 'Weekly Variation',
        accessor: 'cvar_week'
    }, {
        Header: 'Monthly Variation',
        accessor: 'cvar_month'
    }, {
        Header: 'Long-term Variation',
        accessor: 'cvar_long_term'
    }, {
        Header: 'Weekly Valuation',
        accessor: 'valuation_week'
    }, {
        Header: 'Monthly Valuation',
        accessor: 'valuation_month'
    }, {
        Header: 'Long-term Valuation',
        accessor: 'valuation_long_term'
    }, {
        Header: 'Weekly Highs',
        accessor: 'highest_price_week'
    }, {
        Header: 'Weekly Lows',
        accessor: 'lowest_price_week'
    }, {
        Header: 'Item Type',
        accessor: typeString
    }], []);

    return (
        <div>
            {
                loaded ? (<Table columns={columns} data={contents} filter={props.filter}></Table>) : (<div> </div>)
            }
        </div>
    );
}

function Table({ columns, data, filter }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        canPreviousPage,
        canNextPage,
        gotoPage,
        pageCount,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex },
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0 },
    },
        usePagination
    )

    let itemsPerPage = useSelector(state => state.items.itemsPerPage);

    useEffect(() => {
        setPageSize(itemsPerPage);
    }, [itemsPerPage])

    return (
        <div className="items">
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()} className="val">{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        const values = row.values;
                        return (
                            <tr key={i}>
                                <td className="val">
                                    <Image src={values.item_image_uri} />
                                </td>
                                <td className="val">{values.item_name}</td>
                                <td className="val">{values.buy_limit}</td>
                                <td className="val">{values.prices[values.prices.length - 1].toLocaleString()}</td>
                                <td className="val">{variation(values.cvar_week)}</td>
                                <td className="val">{variation(values.cvar_month)}</td>
                                <td className="val">{variation(values.cvar_long_term)}</td>
                                <td className="val">{valuation(values.valuation_week)}</td>
                                <td className="val">{valuation(values.valuation_month)}</td>
                                <td className="val">{valuation(values.valuation_long_term)}</td>
                                <td className="val">{values.highest_price_week.toLocaleString()}</td>
                                <td className="val">{values.lowest_price_week.toLocaleString()}</td>
                                <td className="val">
                                {
                                    // Types are now arrays, remove duplicate elements in reducer maybe? remove quotations "" on sub_types.
                                    filter === 'type' ? values.item_sub_type.map((sub_type, type_i) => {
                                        return (<h6 key={type_i}>{sub_type}</h6>)
                                    }
                                    ) : values.item_type.map((type, type_i) => {
                                        return (<h6 key={type_i}>{type}</h6>)
                                    })
                                }
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            {
                filter ? (
                    <div>
                        <Container className="page-navigation">
                            <div className="nav-elements">
                                <Button variant="secondary" className="nav-button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</Button>
                                <Button variant="secondary" className="nav-button" onClick={() => previousPage()} disabled={!canPreviousPage}>{'<'}</Button>
                                <input placeholder={pageIndex + 1} className="nav-input" ></input>
                                <Button variant="secondary" className="nav-button" onClick={() => nextPage()} disabled={!canNextPage}>{'>'}</Button>
                                <Button variant="secondary" className="nav-button" onClick={() => gotoPage(pageCount)} disabled={!canNextPage}>{'>>'}</Button>
                            </div>
                            <div className="page-info">
                                Page {pageIndex + 1} of {pageCount}
                            </div>
                        </Container>
                    </div>
                ) : null
            }
        </div>
    )
}