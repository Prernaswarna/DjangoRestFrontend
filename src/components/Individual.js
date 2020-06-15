import React , {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {Button} from 'semantic-ui-react';
import CKEditor from 'ckeditor4-react';


class Individual extends Component
{
        constructor(props)
        {
                super(props);
                this.state = { data :[]};
        }
async componentDidMount()
{
	const projectId = this.props.location.state.projectNumber;
        const response = await fetch(`http://127.0.0.1:8000/project/${projectId}`);
        const json = await response.json();
        this.setState({data:json});
        console.log({projectId});
	console.log(json);
}

render()
{
        return (
     <div>
        <p>{this.state.data.id}: {this.state.data.project_name} , 
	<CKEditor data={this.state.data.wiki} type="inline" readOnly={true} />
		
		</p>
	<Button as={Link} to={{pathname:"/reportbug",state:{projectNumber:this.state.data.id} }} >Report an Issue</Button>
      </div>
    );

}
}

export default Individual;

