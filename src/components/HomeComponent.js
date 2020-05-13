import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Image } from 'reactstrap';
import {Loading} from './LoadingComponent'

function RenderCard({item, isLoading, errMess}) {
   if(isLoading){
        return ( 
        <Loading />
            );
    }// returns loading message when loads or errMess
    if (errMess){
        return (<h4>{errMess}</h4>
        );
    }
    return (
       <Card>
       <CardImg src={item.image} alt={item.name} />
       <CardBody>
       <CardTitle>{item.name}</CardTitle>
       <CardText>{item.description}</CardText>
       </CardBody>
   </Card>
    )
}

 function Home(props){
     return(
         <div className="container">
             <div className="row">
                 <div className="col-md"><RenderCard 
                 item={props.campsite}
                 isLoading={props.campsitesLoading}
                 errMess={props.campsitesErrMess}
                 /> </div>
                 <div className="col-md"><RenderCard item={props.promotion}/></div>
                 <div className="col-md"><RenderCard item={props.partner}/></div>
                 </div>
         </div>
     )
 }
 export default Home;