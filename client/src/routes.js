import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from './components/navbar';
import Searchbar from './components/searchbar';
import SearchBuyLimit from './pages/SearchBuyLimit';
import SearchRising from './pages/SearchRising';
import SearchByInput from './pages/SearchByInput';
import SearchFalling from './pages/SearchFalling';
import SearchType from './pages/SearchType';
import LandingPage from './pages/LandingPage';
import Footer from './components/footer';
import Acknowledgements from './pages/Information/acknowledgements';
import Questions from './pages/Information/questions';
import './spreadsheets/routes.css';

export default function Routes() {

    return (
        <BrowserRouter>
            <div className="view">
                <div className="left-container">
                    <Navigation></Navigation>
                </div>
                <div className="right-container">
                    <Searchbar></Searchbar>
                    <Switch>
                        <Route exact path='/' render={() => (<LandingPage />)}></Route>
                        <Route exact path='/rising' render={() => (<SearchRising />)}></Route>
                        <Route exact path='/falling' render={() => (<SearchFalling />)}></Route>
                        <Route exact path='/type/:type' render={() => (<SearchType />)}></Route>
                        <Route exact path='/buylimit/:buylimit' render={() => (<SearchBuyLimit />)}></Route>
                        <Route exact path='/search/:keyword' component={SearchByInput}></Route>
                        <Route exact path='/Acknowledgements' render={() => (<Acknowledgements />)}></Route>
                        <Route exact path='/Questions' render={() => (<Questions />)}></Route>
                    </Switch>
                </div>
            </div>
            <Footer></Footer>
        </BrowserRouter>
    )
}