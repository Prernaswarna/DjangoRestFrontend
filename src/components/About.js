import React , {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {Grid , Button , Segment} from 'semantic-ui-react'; 
import {Link} from 'react-router-dom';

class About extends Component
{
	constructor()
	{
		super();
		this.state = { data :[], isLoggedIn:false};
	}
async componentDidMount()
{
	const res = await axios({url:'http://127.0.0.1:8000/user/currentuser', method:'get' , withCredentials:true})

        const js =  await res.data;
        console.log(res.data);
        this.setState({typeofuser:js.typeofuser})
        this.setState({userId:js.userId});
	 if(this.state.userId==0)
        {

                window.location.href="http://127.0.0.1:3000/";
        }
        else
        {
                this.setState({isLoggedIn:true});
        }


	
	const response = await fetch('http://127.0.0.1:8000/user/');
	const json = await response.json();
	this.setState({data:json});
	console.log(json);
}

render()
{
	const styl= this.state.isLoggedIn ? {display:''} : {display:'none'}
	return (
      <div style={styl}>
        <Grid columns={4} divided>
	<Grid.Row>
	<Grid.Column>
		User Id
	</Grid.Column>
	<Grid.Column>
		Username
	</Grid.Column>
	<Grid.Column>
		Email ID
	</Grid.Column>
	<Grid.Column>
		Enrollment Numbers
	</Grid.Column>
	</Grid.Row>
          {this.state.data.map(el => (
            <Grid.Row>
		 <Grid.Column>
              {el.id}
		  </Grid.Column>
		  <Grid.Column>
		  {el.username} 
		  </Grid.Column>
		  <Grid.Column>
		  {el.email} 
		  </Grid.Column>
		  <Grid.Column>
		  {el.enroll}
		  </Grid.Column>
           </Grid.Row>    
          ))}
	
        </Grid>

	<Button as={Link} to={{pathname:"/projects" , state:{userId:this.state.userId , typeofuser:this.state.typeofuser} }} >View All Projects</Button>



	<Button as={Link} to={{pathname:"/mypage" , state:{userId:this.state.userId , typeofuser:this.state.typeofuser} }} >My Page</Button>

      </div>
    );

}
}
 
export default About;
