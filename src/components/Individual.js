import React , {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';


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
        <p>{this.state.data.id}: {this.state.data.project_name} , {this.state.data.wiki}</p>
      </div>
    );

}
}

export default Individual;

