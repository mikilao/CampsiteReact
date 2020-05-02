import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Directory from './DirectoryComponents';
import CampsiteInfo from './CampsiteInfoComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import {Switch, Route, Redirect} from "react-router-dom";
import { COMMENTS } from '../shared/comments';
import { PARTNERS } from '../shared/partners';
import { PROMOTIONS } from '../shared/promotions';
import { CAMPSITES } from '../shared/campsites';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES,
            comments: COMMENTS,
            partners: PARTNERS,
            promotions: PROMOTIONS
                 };
    }
    render() {
        const HomePage = () =>{
            return( 
                <Home 
                campsite={this.state.campsites.filter(campsite => campsite.featured)[0]}
                    promotion={this.state.promotions.filter(promotion => promotion.featured)[0]}
                    partner={this.state.partners.filter(partner => partner.featured)[0]} />
            );
        }
        //initialize the new campsite with for the router link below variable with an arrow function
        const CampsiteWithId = ({match})=> {
            return (
                //creating a new array of campsite Id numbers using filter and the Campsite info component
                <CampsiteInfo 
                campsite={this.state.campsites.filter(campsite => campsite.id=== +match.params.campsiteId)} 
                comments={this.state.comments.filter(comment => comment.id=== +match.params.commentId)}
                />
            //using '+" infront of a string convert it to a number
                )
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
                    <Route path='/directory/:campsiteId' component={CampsiteWithId}/>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/contactus' component={Contact} />
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