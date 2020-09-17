import { React, useEffect, useState, useParams } from 'react';
import { Button } from 'react-bootstrap';
import { api, getInfo }from '../../config/api';
import Items from '../../components/items';

export default function SearchBuyLimit() {

    let { buy_limit } = useParams();
    const [items, setItems] = useState([]);
    const [loaded, setLoaded] = useState(false); 
    const [previousItems, setPreviousItems] = useState([]);
    const [page, setPage] = useState(1);
    const filter = 'buylimit';

    useEffect(async () => {
        await api.get(`/BuyLimitInit/${buy_limit}`);
        setItems(await getInfo(filter));

        setLoaded(true);
    }, [])

    async function handleFirstPage() {
        if (page >= previousItems.length) {
            setPreviousItems(previousItems.push(items));
        }

        setPage(1);
        setItems(previousItems[0]);
    }

    async function handlePreviousPage() {
        if (page >= previousItems.length) {
            setPreviousItems(previousItems.push(items));
        }

        setPage(page - 1);
        setItems(previousItems[page - 1]);
    }

    async function handlePageChange(e) {
        if (e.key == 'Enter' && e.target.value < previousItems.length) {
            if (page >= previousItems.length) {
                setPreviousItems(previousItems.push(items));
            }

            setPage(e.target.value);
            setItems(previousItems[page - 1]);
        }
    }

    async function handleNextPage() {
        setPage(page + 1);
        setPreviousItems(previousItems.push(items));

        setItems(await getInfo(filter));
    }

    return (
        <div>
            <h2 class="title">Buy Limit: {buy_limit}</h2>
            {loaded ? (
                <>
                    <Items items={items} filter={filter}></Items>
                    <div class="navigation">
                        <Button variant="secondary" value="<<" class="navButton" onClick={handleFirstPage}></Button>
                        <Button variant="secondary" value="<" class="navButton" onClick={handlePreviousPage}></Button>
                        <input placeholder={page} onKeyDown={handlePageChange}></input>
                        <Button variant="secondary" value=">" class="navButton" onClick={handleNextPage}></Button>
                    </div>
                </>
            ) : (
                    <h4>Loading...</h4>
                    // Add a loading animation?
                )}
        </div>
    );
}