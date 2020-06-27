import React , {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {Redirect , Link} from 'react-router-dom';
import {Segment ,Button} from 'semantic-ui-react';
import CKEditor from 'ckeditor4-react';


class Individual extends Component
{
        constructor(props)
        {
                super(props);
                this.state = { data :[] , isDisplayed:false,typeofuser:false,userId:0 , isLoggedIn:false,redirect:false};
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
        <Segment vertical>{this.state.data.id}: {this.state.data.project_name} </Segment> 
	<Segment vertical><CKEditor data={this.state.data.wiki} type="inline" readOnly={true} />
		
		</Segment>
	<Segment vertical>Project Members : {this.state.data.project_members}</Segment>
	
        <Button as={Link} to={{pathname:"/viewissues",state:{projectNumber:this.state.data.id , typeofuser:this.state.typeofuser , userId:this.state.userId} }} >View All Issues</Button>
	<label style={style}>  <Button as={Link} to={{pathname:"/editproject" , state:{projectNumber:this.state.data.id , typeofuser:this.state.typeofuser , userId:this.state.userId} }} >Edit Project</Button></label>
	<Button style={style} onClick={event=>this.deleteProject(event)} >Delete Project</Button>
		{this.renderRedirect()}

	</div>
    );

}
}

export default Individual;

