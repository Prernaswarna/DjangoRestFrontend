import React , {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {Link,Redirect} from 'react-router-dom';
import {Button , Segment} from 'semantic-ui-react';



class Individualissue extends Component
{
        constructor(props)
        {
                super(props);
                this.state = { data :[],projectinfo:[],isDisplayed:false,typeofuser:false,userId:0};
        	this.deleteIssue = this.deleteIssue.bind(this);
	}
async componentDidMount()
{
        const issueId = this.props.location.state.issueId;
        const response = await fetch(`http://127.0.0.1:8000/bug/${issueId}`);
	const projectId = this.props.location.state.projectNumber;
	const res = await fetch(`http://127.0.0.1:8000/project/${projectId}`);
        const json = await response.json();
	const js = await res.json();
        this.setState({data:json});
	this.setState({projectinfo:js});
	const resp = await axios({url:'http://127.0.0.1:8000/user/currentuser', method:'get' , withCredentials:true})

        const j = await resp.data;
        this.setState({typeofuser:j.typeofuser})
        this.setState({userId:j.userId});
	for(let user in this.state.projectinfo.project_members)
        {
                console.log(this.state.projectinfo.project_members[user]);
                if(this.state.userId == this.state.projectinfo.project_members[user])
                {
                        this.setState({isDisplayed:true});
                }
        }
        if(this.state.typeofuser==true)
        {
                this.setState({isDisplayed:true});
        }

}

deleteIssue = event => {
  event.preventDefault()
        const issueId = this.props.location.state.issueId;
  const response = axios({url:`http://127.0.0.1:8000/bug/${issueId}` ,method:'DELETE' , withCredentials:true} );
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
	 const style= this.state.isDisplayed ? {display:''} : {display:'none'}
        return (
     <div>
		<Segment vertical>Issue Id :{this.state.data.id}</Segment> 
		<Segment vertical>Project Id:{this.state.data.project}</Segment>
		<Segment vertical>Title : {this.state.data.heading} </Segment>
		<Segment vertical>Description : {this.state.data.description}</Segment>
		<Segment vertical>Document : {this.state.data.doc}</Segment>
		<Segment vertical>Tags : {this.state.data.tags}</Segment>
		<Segment vertical>Status : {this.state.data.statusval} </Segment>
		<Segment vertical>Reporter : {this.state.data.reporter} </Segment>
		<Segment vertical>Assignee : {this.state.data.assignee} </Segment>
                        
        <Button style={style} as={Link} to={{pathname:"/editissue",state:{issueId:this.state.data.id, projectNumber:this.state.data.project} }} >Edit Issue</Button>
<Button  as={Link} to={{pathname:"/comments",state:{issueId:this.state.data.id, userId:this.state.userId} }} >Comment</Button>

		<Button style={style} onClick={event=>this.deleteIssue(event)} >Delete Issue</Button>
                {this.renderRedirect()}


</div>
    );

}
}

export default Individualissue;

