import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
class CampsiteInfo extends Component {
    constructor(props) {
        super(props);

    }
    renderComments(comments) {
        console.log(comments)
        if (comments) {
            return (
                <div className="col-md-5 m-1 text-left" >
                    <h4 >Comments</h4>
                    {comments.map(comment => <div key={comment.id}>{comment.text} <br /> --{comment.author},  {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))} </div>)}

                </div>
            );
        } return <div />
    }
   
        render() {
            if (this.props.campsite) {
                return (
                    <div className="container">
                        <div className="row">
                            {this.renderCampsite(this.props.campsite)}
                            {this.renderComments(this.props.campsite.comments)}
                        </div>
                    </div>
                );
            }
            return <div />;
        }
    renderCampsite(campsite) {
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
        )
    }
        
}
export default CampsiteInfo;