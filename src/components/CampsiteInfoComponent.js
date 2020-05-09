import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,  Breadcrumb, BreadcrumbItem, Modal, ModalHeader, Form, FormGroup, Label, ModalBody, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control } from 'react-redux-form';


class CommentForm extends Component{
    
    constructor(props) {
        super(props);

        this.state = {
          isModalOpen: false
        };
            //finds the event hendler for the modal binding the boolean state 
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
                  }); 
                }      
     handleSubmit(event){
                    alert('Your Comment:'+ JSON.stringify.event);
                    this.toggleModal();
                    event.preventDefault();
                }
    

    render() {
        return (
            <React.Fragment>
                <Button color="info" outline onClick={this.toggleModal}><i className="fas fa-pencil-alt"></i>Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.toggleModal}>
                            <FormGroup>
                                 <Label htmlFor="author">Your Name</Label>
                                <Control.text type="text" id="author" name="author"
                                    innerRef={input => this.author = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="rating">Rating</Label>
                                <Control.select model="./rating" type="select" name="rating" id="rating">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </FormGroup>
                            <FormGroup>
                                <Label for="text">Comment</Label>
                                <Control.textarea type="textarea" name="text" model="./text" id="exampleText" />
                            </FormGroup>
                            
                            <Button type="submit" value="submit" color="primary" onClick={this.handleSubmit}> Submit</Button>
                        </Form>
                    </ModalBody>
                </Modal>

    </React.Fragment>
          
   
    )
}
};


function RenderComments({comments}) {

    if (comments) {
        return (
            <div className="col-md-5 m-1 text-left" >
                <h4 >Comments</h4>
                {comments.map(comment => <div key={comment.id}>{comment.text} <br /> --{comment.author},  {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))} </div>)}

            </div>
        );
    } return <div />

};

function RenderCampsite(campsite) {
    if(campsite){
        return (
            <div className="col-md-5 m1" >
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                      <CardText>{campsite.description}</CardText>

                    </CardBody>
                </Card>
             <CommentForm />
             
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