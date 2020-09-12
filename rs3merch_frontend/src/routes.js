import { BrowserRouter } from "react-router-dom";
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar';
import Searchbar from './components/searchbar';
import SelectBuyLimit from './pages/SearchBuyLimit';
import SelectInvestments from './pages/SelectInvestments';
import SelectSearchBar from './pages/SelectSearchBar';
import SelectStable from './pages/SelectStable';
import SelectType from './pages/SelectType';

export default function Routes() {
    return (
        <BrowserRouter>
            <div class="container">
                <Searchbar></Searchbar>
                <Navbar></Navbar>
            </div>
            <Switch>
                <Route path='/buy_limit/search/:buy_limit' component={SelectBuyLimit}></Route>
                <Route path='/invest/search' component={SelectInvestments}></Route>
                <Route path='/stable/search' component={SelectStable}></Route>
                <Route path='/type/search/:type' component={SelectType}></Route>
                <Route path='/search/:keyword' component={SelectSearchBar}></Route>
            </Switch>
        </BrowserRouter>
    )
}