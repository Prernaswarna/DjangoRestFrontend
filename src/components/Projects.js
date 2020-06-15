import React , {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {Button} from 'semantic-ui-react';
import CKEditor from 'ckeditor4-react';

class Projects extends Component
{
        constructor()
        {
                super();
                this.state = { data :[]};
        }
async componentDidMount()
{
        const response = await fetch('http://127.0.0.1:8000/project/');
        const json = await response.json();
        this.setState({data:json});
        console.log(json);
}

render()
{
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
		  <Button as={Link} to={{pathname:"/editproject" , state:{projectNumber:el.id} }} >Edit Project</Button>
	</li>
          ))}
        </ul>
	<Button as={Link} to={{pathname:"/newproject"}} >Add Project</Button>

      </div>
    );

}
}

export default Projects;

