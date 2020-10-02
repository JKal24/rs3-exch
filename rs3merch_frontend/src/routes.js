import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from './components/navbar';
import Searchbar from './components/searchbar';
import SearchBuyLimit from './pages/SearchBuyLimit';
import SearchInvestments from './pages/SearchInvestments';
import SearchByInput from './pages/SearchByInput';
import SearchStable from './pages/SearchStable';
import SearchType from './pages/SearchType';
import LandingPage from './pages/LandingPage';
import './routes.css';

export default function Routes() {
    return (
        <BrowserRouter>
            <div className="view">
                <Navigation></Navigation>
                <div className="right-container">
                    <Searchbar></Searchbar>
                    <Switch>
                        <Route exact path='/' component={LandingPage}></Route>
                        <Route exact path='/buylimit/:buy_limit' component={SearchBuyLimit}></Route>
                        <Route exact path='/invest' component={SearchInvestments}></Route>
                        <Route exact path='/stable' component={SearchStable}></Route>
                        <Route exact path='/type/:type' component={SearchType}></Route>
                        <Route exact path='/search/:keyword' component={SearchByInput}></Route>
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    )
}