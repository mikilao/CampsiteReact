import React, { Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
function RenderCampsite(campsite) {
    
        return (
            <div className="col-md-5 m1" >
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardImgOverlay><CardTitle>{campsite.name}</CardTitle>
                        </CardImgOverlay>
                        <CardText>{campsite.description}</CardText>

                    </CardBody>
                </Card>
            </div>
        );
    }
   
        class CampsiteInfo extends Component{
            render() {
                if (this.props.campsite) {
                    return (
                        <div className="container">
                            <div className="row">
                                {this.renderCampsite(this.props.campsite)}
                                
                                {this.renderComments(this.props.comments)}
                            </div>
                        </div>//comments and campsite are now being popuated by the CampstieWithId component in main
                    );
                }
                return <div />;
            }
        }

export default CampsiteInfo;