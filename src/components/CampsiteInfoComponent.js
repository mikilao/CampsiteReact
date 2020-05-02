import React, { Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderCampsite(campsite) {
    if(campsite){
        return (
            <div className="col-md-5 m1" >
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardImgOverlay>
                        </CardImgOverlay>
                        <CardText>{campsite.description}</CardText>

                    </CardBody>
                </Card>
            </div>
        );
    }
   }
     function CampsiteInfo (props){
            if (props.campsite) {
                return (
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <Breadcrumb>
                                    <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                                    <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                                </Breadcrumb>
                                <h2>{props.campsite.name}</h2>
                                <hr />
                            </div>
                        </div>
                        <div className="row">
                            <RenderCampsite campsite={props.campsite} />
                            <RenderComments comments={props.comments} />
                        </div>
                    </div>
                //comments and campsite are now being popuated by the CampstieWithId component in main
                    );
                }
                return <div />;
            }
        

export default CampsiteInfo;