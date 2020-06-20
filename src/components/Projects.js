import React , {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {Grid , Button} from 'semantic-ui-react';
import CKEditor from 'ckeditor4-react';

class Projects extends Component
{
        constructor(props)
        {
                super(props);
                this.state = { data :[] , typeofuser:false ,userId:0 };
        }
async componentDidMount()
{
        const response = await fetch('http://127.0.0.1:8000/project/');
        const json = await response.json();
        this.setState({data:json})
	
	const res = await axios({url:'http://127.0.0.1:8000/user/currentuser', method:'get' , withCredentials:true})

        const js = await res.data;
        this.setState({typeofuser:js.typeofuser})
	this.setState({userId:js.userId});
	/*console.log(this.state.isDisplayed);
	console.log(this.props.location.state.userId);
	console.log(this.props.location.state.typeofuser);*/
	console.log(js);
}

render()
{
		
        return (
      <div>
        <Grid columns ={3} divided>
	<Grid.Row>
        <Grid.Column>
                Project Id
        </Grid.Column>
        <Grid.Column>
                Project Name
        </Grid.Column>
        <Grid.Column>
                Wiki
        </Grid.Column>
        </Grid.Row>
	
          {this.state.data.map(el => (
             <Grid.Row>
	        <Grid.Column>
			{el.id}
		</Grid.Column>
		<Grid.Column>
              <Link to={{
		      pathname : "/individual",
		      state :{projectNumber:  el.id }
		}} >
		  {el.project_name} 
		</Link>
		</Grid.Column>
		<Grid.Column>
		  <CKEditor 
		 data= {el.wiki} type="inline" readOnly={true}
		  />
		</Grid.Column>
        	
		 
		 </Grid.Row>
          ))}
        </Grid>
	<Button as={Link} to={{pathname:"/newproject" }} >Add Project</Button>

      </div>
    );

}
}

export default Projects;

