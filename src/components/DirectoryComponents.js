import React from 'react';
import {Link} from 'react-router-dom';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Loading} from "./LoadingComponent";
import {baseUrl} from "../shared/baseURL";



    function RenderDirectoryItem({ campsite }) {
        return (//Link changes the directory and give you the campsite by id#
          <Card >
            <Link to={`/directory/${campsite.id}`}>
              <CardImg width="100%" src={baseUrl + campsite.image} alt={campsite.name} />
              <CardImgOverlay>
                <CardTitle>{campsite.name}</CardTitle>
              </CardImgOverlay>
            </Link>
          </Card>
        )
      }
function Directory (props) { 
        
        
 /*  constructor(props) {
        super(props);
        this.state = {
            selectedCampsite: null
            
        };
    }
    /*onCampsiteSelect(campsite){
        this.setState({selectedCampsite: campsite});
    }
  /*  renderSelectedCampsite(campsite){
        if(campsite){
            return(<Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardTitle>{campsite.name}</CardTitle>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
            );
        }
        return <div />;
    }*/

        const directory = props.campsites.campsites.map(campsite => {
            return (
                <div key={campsite.id} className="col-md-5 m-1">
               <RenderDirectoryItem campsite={campsite}  />>
            </div>
            );
        });
        if (props.campsites.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        if (props.campsites.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h4>{props.campsites.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
    
        return (
            <div className="container">
                 <div className="row">
                     <div className="col">
                         <Breadcrumb>
                            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Directory</BreadcrumbItem>
                         </Breadcrumb>
                     </div>
                 </div>
                <div className="row">
                    {directory}
                </div>
               
                
            </div>
        );
};




export default Directory;