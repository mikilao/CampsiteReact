import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseURL';
import { FadeTransform } from 'react-animation-components';

function RenderCard({ isLoading, errMess, item}) {
   if(isLoading){
        return ( 
        <Loading />
            );
    }// returns loading message when loads or errMess beofre th card loads
    if (errMess){
        return (<h4>{errMess}</h4>
        );
    }
    return (
        <FadeTransform in transformProps={{
                exitTransform: 'scale(0.5) translateY(50%)'
            }}>
       <Card>
       <CardImg src={baseUrl + item.image} alt={item.name} />
       <CardBody>
       <CardTitle>{item.name}</CardTitle>
       <CardText>{item.description}</CardText>
       </CardBody>
   </Card>
        </FadeTransform>
    );
}

 function Home(props){
     return(
         <div className="container">
             <div className="row">
                 <div className="col-md"><RenderCard 
                 item ={props.campsite}
                 isLoading={props.campsitesLoading}
                 errMess={props.campsitesErrMess}
                 /> </div>
                 <div className="col-md"><RenderCard item={props.promotion}
                 isLoading={props.promotionLoading}
                 errMess = {props.campsitesErrMess}
                 /></div>
                 <div className="col-md"><RenderCard item={props.partner}/></div>
                 </div>
         </div>
     )
 }
 export default Home;