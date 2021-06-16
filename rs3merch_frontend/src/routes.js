import React, { useState } from 'react';
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

    const [pythonPlots, enablePythonPlots] = useState(false);

    return (
        <BrowserRouter>
            <div className="view">
                <Navigation></Navigation>
                <div className="right-container">
                    <Searchbar enablePlots={enablePythonPlots} plots={pythonPlots}></Searchbar>
                    <Switch>
                        <Route exact path='/' render={() => (<LandingPage plots={pythonPlots}/>)}></Route>
                        <Route exact path='/invest' render={() => (<SearchInvestments plots={pythonPlots}/>)}></Route>
                        <Route exact path='/stable' render={() => (<SearchStable plots={pythonPlots}/>)}></Route>
                        <Route exact path='/type/:type' render={() => (<SearchType plots={pythonPlots}/>)}></Route>
                        <Route exact path='/buylimit/:buy_limit' render={() => (<SearchBuyLimit plots={pythonPlots}/>)}></Route>
                        <Route exact path='/search/:keyword' render={() => (<SearchByInput plots={pythonPlots}/>)}></Route>
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    )
}