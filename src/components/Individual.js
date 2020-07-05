import React , {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {Redirect , Link} from 'react-router-dom';
import {Segment ,Button , Header , List} from 'semantic-ui-react';
import CKEditor from 'ckeditor4-react';


class Individual extends Component
{
        constructor(props)
        {
                super(props);
                this.state = { data :[] , isDisplayed:false,typeofuser:false,userId:0 , isLoggedIn:false,redirect:false, users:[]};
        this.deleteProject = this.deleteProject.bind(this);

	}
async componentDidMount()
{
	const res = await axios({url:'http://127.0.0.1:8000/user/currentuser', method:'get' , withCredentials:true})

        const js = await res.data;
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

	const projectId = this.props.location.state.projectNumber;
        const response = await fetch(`http://127.0.0.1:8000/project/${projectId}`);
        const json = await response.json();
        this.setState({data:json});
	
	console.log(this.state.data.project_members);
	for(let user in this.state.data.project_members)
	{
		console.log(this.state.data.project_members[user]);
		if(this.state.userId == this.state.data.project_members[user])
		{
			this.setState({isDisplayed:true});
		}
	}
	if(this.state.userId==true)
	{
		this.setState({isDisplayed:true});
	}
	let newarr = [];
	for(let user in this.state.data.project_members)
	{
		let worth = this.state.data.project_members[user];
		const worthy = await axios({url:`http://127.0.0.1:8000/user/${worth}`,method:'GET' , withCredentials:true});
		let w = await worthy.data;
			console.log(w);
		newarr.push(w["username"]);
		console.log(newarr);
	}
	this.setState({users:newarr});

        
}

deleteProject = event => {
  event.preventDefault()
	const projectId = this.props.location.state.projectNumber;
  const response = axios({url:`http://127.0.0.1:8000/project/${projectId}` ,method:'DELETE' , withCredentials:true} );
  console.log(response);
	  this.setState({redirect:true});

       
}

renderRedirect= () =>{
        if(this.state.redirect==true)
        {
                return <Redirect to={{pathname:'/deletedone'  }}/>
        }
}



render()
{
	 const styl= this.state.isLoggedIn ? {display:''} : {display:'none'} 
	const style= this.state.isDisplayed ? {display:''} : {display:'none'}
        return (
     <div style={styl}>

  <Header as='h2' textAlign='center'>
    
    <Header.Content>
		Project : {this.state.data.project_name}
      <Header.Subheader>View all details</Header.Subheader>
    </Header.Content>
  </Header>
	<div style={{padding:'0px 10% 2% 10%'}}><Segment color='olive' ><CKEditor data={this.state.data.wiki} type="inline" readOnly={true} /></Segment></div>

        <div style={{padding:'3% 10% 2% 10%'}}><Segment color='olive'><span style={{fontWeight:'bold', fontSize:'17px',fontFamily:'Georgia serif'}}>Project Id :</span> {this.state.data.id}</Segment></div> 
	
	<div style={{padding:'3% 10% 0px 10%'}}><Segment color='olive' ><span style={{fontWeight:'bold', fontSize:'17px',fontFamily:'Georgia serif'}}>Project Members :</span> 
		<ul style={{overflow:'hidden', listStyleType:'none'}}>{this.state.users.map(el=>(<li style={{float:'left' ,padding:'2px 4px 2px 4px' ,margin:'0px 2px 0px 2px' , backgroundColor:'#006400' , color:'white',border:'0.2px solid #006400' ,borderRadius:'4px'}}>{el}</li>))}</ul></Segment></div>
		
<div style={{padding:'5% 0px 0px 0px', textAlign:'center'}}>	
        <Button color='blue' as={Link} to={{pathname:"/viewissues",state:{projectNumber:this.state.data.id,projectname:this.state.data.project_name , typeofuser:this.state.typeofuser , userId:this.state.userId} }} >View All Issues</Button>
	<label style={style}>  <Button color='green' as={Link} to={{pathname:"/editproject" , state:{projectNumber:this.state.data.id , typeofuser:this.state.typeofuser , userId:this.state.userId} }} >Edit Project</Button></label>
	<Button color='red' style={style} onClick={event=>this.deleteProject(event)} >Delete Project</Button>
		</div>
		{this.renderRedirect()}

	</div>
    );

}
}

export default Individual;

