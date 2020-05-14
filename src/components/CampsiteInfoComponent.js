import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Row, Col, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, Form, Label, ModalBody, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import {Loading} from './LoadingComponent'
import { baseUrl } from '../shared/baseURL';

const required = val => val && val.length;

const maxLength = len => val => !val || (val.length <= len);
// will return true is theres a val and the value is less than max length
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            author: "",
          isModalOpen: false,
          touched: { author: false}
        };
            //finds the event hendler for the modal binding the boolean state 
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }
 validate(author) {
        const errors = {
          author: ''
        };
    
        if (this.state.touched.author) {
            if (author.length < 2) {
                errors.author = 'Author name must be at least 2 characters.';
            } else if (author.length > 15) {
                errors.author = 'Author name must be 15 or less characters.';
            }
          }  return errors;
           
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
                  }); 
                }      
     handleSubmit(event){
                    //alert(`Your Comment:`+ JSON.stringify(event));
                    this.props.addComment(this.props.campsite, event.rating, event.author, event.text)
                    this.toggleModal();
                    //event.preventDefault() stops an action or process
                }
    

    render() {
       // const errors =this.validate(this.state.author);
        return (
            <React.Fragment>
                <Button color="info" outline onClick={this.toggleModal}><i className="fa fa-pencil-alt"></i>Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.toggleModal}> 
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Col>
                                 <Label htmlFor="author">Your Name</Label>
                                <Control.text  id="author" model=".author" name="author" className="form-control"
                                   placeholder="Your Name"
                                   validators= {{
                                        required, 
                                    minLength: minLength(2),
                                    maxLength: maxLength(15)}}/>
                                     <Errors 
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        required: 'Required',
                                        minLength:'Must be at least 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}/>
                                    </Col>
                           </Row>
                            <Row className="form-group">
                                <Col>
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" type="select" name="rating" id="rating" className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select></Col>
                            </Row>
                             
                            <Row className="form-group">
                               <Col>
                                <Label htmlFor="text">Comment</Label>
                                <Control.textarea  name="text" model=".text" id="text" rows='6'className="form-control" />
                               
                            </Col>
                            </Row>
                                            <Button type="submit" value="submit" color="primary" onClick={this.handleSubmit}> Submit</Button>
                        </LocalForm>
                        </Form>
                    </ModalBody>
                </Modal>
    </React.Fragment>
          
   
    )
}
};


function RenderComments({comments, addComment, campsiteId}) {
    if (comments) {
        return (
            <div className="col-md-5 m-1 text-left" >
                <h4 >Comments</h4>
                {comments.map(comment => <div key={comment.campsiteId}>{comment.text} <br /> --{comment.author},  {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))} </div>)}
                 <CommentForm  campsiteId={campsiteId} addComment={addComment} />
            </div>
        );
       
    } return <div />

};
  
function RenderCampsite({campsite}) {
    if(campsite){
        return (
            <div className="col-md-5 m1" >
                <Card>
                    <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
                    <CardBody>
                      <CardText>{campsite.description}</CardText>

                    </CardBody>
                </Card>
             
               </div>
           
        );
    }
   }
     function CampsiteInfo (props){
        if (props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                     <Loading />
                    </div>
                </div>
            );
        }
        if (props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h4>{props.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
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
                            <RenderComments 
                            comments={props.comments} 
                            addComment = {props.addComment} //to initiate the action upon the user submitting the comment form
                            campsiteId={props.campsite.id}
                            />
                        </div>
                    </div>
                //comments and campsite are now being popuated by the CampstieWithId component in main
                    );
                }
                return <div />;
            }
        

export default CampsiteInfo;