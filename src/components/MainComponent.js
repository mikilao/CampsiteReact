import React, { Component } from 'react';

import Directory from './DirectoryComponents';
import CampsiteInfo from './CampsiteInfoComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from "./HomeComponent";
import About from "./AboutComponent";
import Contact from "./ContactComponent";
import {actions} from 'react-redux-form';
import {postComment, fetchCampsites, fetchComments, fetchPromotions} from '../redux/ActionCreators';
import {connect} from "react-redux";
import {TransitionGroup, CSSTransition} from 'react-transition-group';
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
    postComment: (campsiteId, rating, author, text) => (postComment(campsiteId, rating, author, text)),
   // addComment: (campsiteId, rating, author, text) => (addComment(campsiteId, rating, author, text)),
    fetchCampsites: () => (fetchCampsites()),
    resetFeedBackForm: ()=>( actions.reset('feedbackForm')),
    fetchComments: ()=> (fetchComments()),
    fetchPromotions: ()=> (fetchPromotions()),
   
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
    componentDidMount(){ //how we run the fetchcampsite
            this.props.fetchCampsites();
            this.props.fetchPromotions();
            this.props.fetchComments();//add action creators here
    } 
    render() {
        const HomePage = () =>{
            return( 
                <Home
                    campsite={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
                    campsitesLoading={this.props.campsites.isLoading}
                    campsitesErrMess={this.props.campsites.errMess}
                    partner={this.props.partners.filter(partner => partner.featured)[0]}
                    promotion={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
                    promotionLoading={this.props.promotions.isLoading}
                    promotionErrMess={this.props.promotions.errMess}/>
            );
        }
        //initialize the new campsite with for the router link below variable with an arrow function
        const CampsiteWithId = ({match})=> {
            return (
                //creating a new array of campsite Id numbers using filter and the Campsite info component
                <CampsiteInfo 
                campsite={this.props.campsites.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
                isLoading={this.props.campsites.isLoading}
                errMess={this.props.campsites.errMess}
                comments={this.props.comments.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
                commentsErrMess={this.props.comments.errMess}
                //addComment={this.props.addComment}
                postComment={this.props.postComment}
                />
            //using '+" infront of a string convert it to a number
                )
        }
        return (
            <div>    
                <Header />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>

                    <Switch>
                        <Route path='/directory/:campsiteId' component={CampsiteWithId}/>
                        <Route path='/home' component={HomePage} />
                        <Route exact path='/contactus' render= {() => <Contact resetFeedbackForm= {this.props.resetFeedBackForm}/>} />
                        <Route exact path='/directory' render={() => <Directory campsites={this.props.campsites} />} />
                        <Route exact path='/aboutus' render={() => <About partners={this.props.partners}/>} ></Route>
                        <Redirect to='/home' />
                    </Switch>
              </CSSTransition>
               </TransitionGroup>
           
                
                <Footer />
            </div>
        );
    };
}

export default withRouter(connect(mapStateToPRops, mapDispatchToProps)(Main));