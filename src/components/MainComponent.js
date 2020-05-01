import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Directory from './DirectoryComponents';
import CampsiteInfo from './CampsiteInfoComponent';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import {Switch, Route, Redirect} from "react-router-dom";
import { CAMPSITES } from '../shared/campsites';
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES,
                 };
    }

   
    render() {
        const HomePage = () =>{
            return( 
                <Home />
            );
        }
        return (
            <div>
                <Navbar dark color="primary">
                    <div className="container">
                        <NavbarBrand href="/">NuCamp</NavbarBrand>
                    </div>
                </Navbar>
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/directory' render={() => <Directory campsites={this.state.campsites} />} />
                    <Redirect to='/home' />
                </Switch>
                <Directory campsites={this.state.campsites} />
                
                <Footer />
            </div>
        );
    };
}

export default Main;