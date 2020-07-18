import React , {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {Label,Table ,Grid , Button , Segment , Header} from 'semantic-ui-react'; 
import {Redirect ,Link} from 'react-router-dom';

class About extends Component
{
	constructor()
	{
		super();
		this.state = { data :[], isLoggedIn:false};
	}
async componentDidMount()
{
	const res = await axios({url:'http://127.0.0.1:8000/user/currentuser', method:'get' , withCredentials:true}).then(response=>{return response}).catch(error=>{window.location.href="http://127.0.0.1:3000/fail"})

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


	
	const response = await axios({url:'http://127.0.0.1:8000/user/' , method:'GET' , withCredentials:true}).then(response=>{return response}).catch(error=>{window.location.href="http://127.0.0.1:3000/fail"})
	const json = await response.data;
	this.setState({data:json});
	console.log(json);
}

changeType = async(id,event) => {
  event.preventDefault()
	console.log(id);
   const singleuser = await axios({url:`http://127.0.0.1:8000/user/${id}` , method:'GET' , withCredentials:true}).then(response=>{return response}).catch(error=>{window.location.href="http://127.0.0.1:3000/fail"})
   const userresponse = await singleuser.data;
	 console.log(userresponse);
          let formData = { username: userresponse.username, email: userresponse.email , enroll:userresponse.enroll , typeofuser:true }
  const response = axios({url:`http://127.0.0.1:8000/user/${userresponse.id}/` ,method:'PUT', data:formData , withCredentials:true} ).then(response=>{return response}).catch(error=>{window.location.href="http://127.0.0.1:3000/fail"})
  console.log(response);
  this.setState({redirect:true});

}

adminType = async(id,event) => {
  event.preventDefault()
        console.log(id);
   const singleadmin = await axios({url:`http://127.0.0.1:8000/user/${id}` , method:'GET' , withCredentials:true}).then(response=>{return response}).catch(error=>{window.location.href="http://127.0.0.1:3000/fail"})
   const adminresponse = await singleadmin.data;
         console.log(adminresponse);
          let formData = { username: adminresponse.username, email: adminresponse.email , enroll:adminresponse.enroll , typeofuser:false }
  const response = axios({url:`http://127.0.0.1:8000/user/${adminresponse.id}/` ,method:'PUT', data:formData , withCredentials:true} ).then(response=>{return response}).catch(error=>{window.location.href="http://127.0.0.1:3000/fail"})
  console.log(response);
  this.setState({redirect:true});

}


renderRedirect= () =>{
        if(this.state.redirect==true)
        {
                return <Redirect to={{pathname:'/adminchange'  }}/>
        }
}


render()
{
	const styl= this.state.isLoggedIn ? {display:''} : {display:'none'}
	return (
      <div style={styl}>
		<div style={{padding:'1% 8% 3% 5%'}}><Header as='h2'>
     <Header.Content>
      User List
      <Header.Subheader>View all registered users</Header.Subheader>
    </Header.Content>
  </Header></div>

	<div style={{padding:'1% 8% 3% 5%'}}>
        <Grid columns={3} divided>
        <Grid.Row>
        <Grid.Column><span style={{fontWeight:'bold'}}>Username</span></Grid.Column>
        <Grid.Column><span style={{fontWeight:'bold'}}>Email Id</span></Grid.Column>
	<Grid.Column><span style={{fontWeight:'bold'}}>Enrollment Number</span></Grid.Column>
      </Grid.Row>
 
      
          {this.state.data.map(el => (
        <Grid.Row>     
	  <Grid.Column>
		 {el.username} 
	  </Grid.Column>
		  <Grid.Column>
		  {el.email} 
		  </Grid.Column>
		  <Grid.Column>
		  {el.enroll}
		  </Grid.Column>
	
		 <Grid.Column>
		  {!el.typeofuser &&
			  <Button color='green' onClick={(e)=>this.changeType(el.id,e)}>Add Admin</Button>}
		  {el.typeofuser &&
                          <Button color='red' onClick={(e)=>this.adminType(el.id,e)}>Remove Admin</Button>}

		 {this.renderRedirect()}
		 </Grid.Column>
           </Grid.Row>    
          ))}
        </Grid>

<div style={{textAlign:'center', padding:'5%'}}><Button color='blue' as={Link} to={{pathname:"/projects" , state:{userId:this.state.userId , typeofuser:this.state.typeofuser} }} >View All Projects</Button>



	<Button color='black' as={Link} to={{pathname:"/mypage" , state:{userId:this.state.userId , typeofuser:this.state.typeofuser} }} >My Page</Button>
</div>
		</div>
      </div>
    );

}
}
 
export default About;
