import React , {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {Grid , Button,Sidebar , Menu , Segment , Label , Header} from 'semantic-ui-react';
import CKEditor from 'ckeditor4-react';

class Projects extends Component
{
        constructor(props)
        {
                super(props);
                this.state = { data :[] , typeofuser:false ,userId:0,isLoggedIn:false };
		

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
 
	console.log(this.state.isLoggedIn);
	const response = await fetch('http://127.0.0.1:8000/project/');
        const json = await response.json();
        this.setState({data:json})
	
	/*console.log(this.state.isDisplayed);
	console.log(this.props.location.state.userId);
	console.log(this.props.location.state.typeofuser);*/
	//console.log(js);
}

render()
{
	const style= this.state.isLoggedIn ? {display:''} : {display:'none'}		
        const s1 = this.state.data && this.state.data.length>0 ? {display:''} : {display:'none'}
	
	return (
	
      <div style={style}>
	
<div style={{padding:'2% 10% 2% 10%'}}><Header as='h2'>
     <Header.Content>
      Project List
      <Header.Subheader>View all the projects</Header.Subheader>
    </Header.Content>
  </Header></div>
	<div style={{padding:'2% 10% 2% 10%'}}>
        <Grid columns ={1} style={s1} >
	
          {this.state.data.map(el => (
             <Grid.Row>
	        <Grid.Column>
		  <Segment raised>
        		<Label as='a' color='pink' ribbon>
			Project Number:{el.id}
		  	</Label>
		 
		<span>
              <Link to={{
		      pathname : "/individual",
		      state :{projectNumber:  el.id }
		}} >
		  {el.project_name} 
		</Link>
		 </span>
		  <CKEditor 
		 data= {el.wiki} type="inline" readOnly={true}
		  />
		 </Segment>
		</Grid.Column>
        	
		 
		 </Grid.Row>
          ))}
        </Grid>
	</div>
	<div style={{textAlign:'center', padding:'5%'}}><Button color='black' as={Link} to={{pathname:"/newproject" }} >Add Project</Button></div>

      </div>
    );

}
}

export default Projects;

