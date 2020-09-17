import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar';
import Searchbar from './components/searchbar';
import SearchBuyLimit from './pages/SearchBuyLimit';
import SearchInvestments from './pages/SearchInvestments';
import SearchByInput from './pages/SearchByInput';
import SearchStable from './pages/SearchStable';
import SearchType from './pages/SearchType';

export default function Routes() {
    return (
        <BrowserRouter>
            <div class="container">
                <Searchbar></Searchbar>
                <Navbar></Navbar>
                <Switch>
                    <Route path='/buylimit/:buy_limit' component={SearchBuyLimit}></Route>
                    <Route path='/invest' component={SearchInvestments}></Route>
                    <Route path='/stable' component={SearchStable}></Route>
                    <Route path='/type/:type' component={SearchType}></Route>
                    <Route path='/search/:keyword' component={SearchByInput}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    )
}