import React, { Component } from 'react';

import Directory from './DirectoryComponents';
import CampsiteInfo from './CampsiteInfoComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from "./HomeComponent";
import About from "./AboutComponent";
import Contact from "./ContactComponent";
import {addComment} from '../redux/ActionCreators';
import {connect} from "react-redux";
import {Switch, Route, Redirect, withRouter} from "react-router-dom";

const mapStateToPRops = state => {
    return{
        campsites: state.campsites,
        comments: state.comments,
        partners: state.partners,
        promotions: state.promotions
    }
}
const mapDispatchToProps = {
    addComment: (campsiteId, rating, author, text) => (addComment(campsiteId, rating, author, text))
};//a variable that returns the array with oll those obj after being passed throguh add comment

class Main extends Component {
   /* constructor(props) **removed because now the states are being stored in redux** 
    {
        super(props);
        this.state = {
            campsites: CAMPSITES,
            comments: COMMENTS,
            partners: PARTNERS,
            promotions: PROMOTIONS
                 };
    }*/
    render() {
        const HomePage = () =>{
            return( 
                <Home 
                campsite={this.props.campsites.filter(campsite => campsite.featured)[0]}
                    promotion={this.props.promotions.filter(promotion => promotion.featured)[0]}
                    partner={this.props.partners.filter(partner => partner.featured)[0]} />
            );
        }
        //initialize the new campsite with for the router link below variable with an arrow function
        const CampsiteWithId = ({match})=> {
            return (
                //creating a new array of campsite Id numbers using filter and the Campsite info component
                <CampsiteInfo 
                    campsite={this.props.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]} 
                    comments={this.props.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
                    addComment={this.props.addComment}
                />
            //using '+" infront of a string convert it to a number
                )
        }
        return (
            <div>    
                <Header />
                <Switch>
                    <Route path='/directory/:campsiteId' component={CampsiteWithId}/>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/contactus' component={Contact} />
                    <Route exact path='/directory' render={() => <Directory campsites={this.props.campsites} />} />
                    <Route exact path='/aboutus' render={() => <About partners={this.props.partners}/>} ></Route>
                    <Redirect to='/home' />
                </Switch>
                
                
                <Footer />
            </div>
        );
    };
}

export default withRouter(connect(mapStateToPRops, mapDispatchToProps)(Main));