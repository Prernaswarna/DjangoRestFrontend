import React , {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';

class Project extends Component
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
		      pathname : "http://127.0.0.1:3000/individual"
		      state :{ projectNumber : el.id }
		}} >{el.project_name}: {el.wiki} 
        	</Link>    
	</li>
          ))}
        </ul>
      </div>
    );

}
}

export default Projects;

