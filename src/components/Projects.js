import React , {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {Button} from 'semantic-ui-react';
import CKEditor from 'ckeditor4-react';

class Projects extends Component
{
        constructor(props)
        {
                super(props);
                this.state = { data :[] , isDisplayed:false};
        }
async componentDidMount()
{
        const response = await fetch('http://127.0.0.1:8000/project/');
        const json = await response.json();
        this.setState({data:json})
	if(this.props.location.state.typeofuser===true)
		this.state.isDisplayed = !this.state.isDisplayed
        console.log(this.props.location.state.typeofuser);
	console.log(this.state.isDisplayed);
}

render()
{
	const style = this.state.isDisplayed ? {} : {display:'none'};
	console.log(style);
        return (
      <div>
        <ul>
          {this.state.data.map(el => (
            <li>
              <Link to={{
		      pathname : "/individual",
		      state :{projectNumber:  el.id }
		}} >
		  {el.project_name}: 
		  <CKEditor 
		 data= {el.wiki} type="inline" readOnly={true}
		  />
        	</Link>
		 <label style={style}>  <Button as={Link} to={{pathname:"/editproject" , state:{projectNumber:el.id , typeofuser:this.props.location.state.typeofuser , userId:this.props.location.state.userId} }} >Edit Project</Button></label>
	</li>
          ))}
        </ul>
	<Button as={Link} to={{pathname:"/newproject"}} >Add Project</Button>

      </div>
    );

}
}

export default Projects;

