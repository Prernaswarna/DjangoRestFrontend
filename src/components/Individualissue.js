import React , {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {Button} from 'semantic-ui-react';



class Individualissue extends Component
{
        constructor(props)
        {
                super(props);
                this.state = { data :[]};
        }
async componentDidMount()
{
        const issueId = this.props.location.state.issueId;
        const response = await fetch(`http://127.0.0.1:8000/bug/${issueId}`);
        const json = await response.json();
        this.setState({data:json});
        console.log({issueId});
        console.log(json);
}

render()
{
        return (
     <div>
		<div><p>Issue Id :{this.state.data.id}</p> </div>
		<div><p>Project Id:{this.state.data.project}</p> </div>
		<div><p>Title : {this.state.data.heading} </p></div>
		<div><p>Description : {this.state.data.description}</p> </div>
		<div><p>Document : {this.state.data.doc}</p> </div>
		<div><p>Tags : {this.state.data.tags}</p> </div>
		<div><p>Status : {this.state.data.statusval} </p></div>
		<div><p>Reporter : {this.state.data.reporter} </p></div>
		<div><p>Assignee : {this.state.data.assignee} </p></div>
                        
        <Button as={Link} to={{pathname:"/editissue",state:{issueId:this.state.data.id, projectNumber:this.state.data.project} }} >Edit Issue</Button>
         </div>
    );

}
}

export default Individualissue;

