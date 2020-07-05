import React , {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {Link,Redirect} from 'react-router-dom';
import {Button , Segment, Image , Header} from 'semantic-ui-react';



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
	console.log(this.props.location.state.projectNames);

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
<Header as='h2' textAlign='center'>

    <Header.Content>
                Issue {this.state.data.heading}
      <Header.Subheader>View details of the issue</Header.Subheader>
    </Header.Content>
  </Header>
		
		<div style={{padding:'3% 10% 2% 10%'}}><Segment color='olive'><span style={{fontWeight:'bold', fontSize:'17px',fontFamily:'Georgia serif'}}>Issue Id :</span> {this.state.data.id}</Segment></div>

		<div style={{padding:'3% 10% 2% 10%'}}><Segment color='olive'><span style={{fontWeight:'bold', fontSize:'17px',fontFamily:'Georgia serif'}}>Project Id :</span> {this.state.data.project}</Segment></div>

		<div style={{padding:'3% 10% 2% 10%'}}><Segment color='olive'><span style={{fontWeight:'bold', fontSize:'17px',fontFamily:'Georgia serif'}}>Project Name :</span> {this.props.location.state.projectNames}</Segment></div>

	<div style={{padding:'3% 10% 2% 10%'}}><Segment color='olive'><span style={{fontWeight:'bold', fontSize:'17px',fontFamily:'Georgia serif'}}>Title :</span> {this.state.data.heading}</Segment></div>

	<div style={{padding:'3% 10% 2% 10%'}}><Segment color='olive'><span style={{fontWeight:'bold', fontSize:'17px',fontFamily:'Georgia serif'}}>Description :</span> {this.state.data.description}</Segment></div>

	<div style={{padding:'3% 10% 2% 10%'}}><Segment color='olive'><span style={{fontWeight:'bold', fontSize:'17px',fontFamily:'Georgia serif'}}>Tags :</span> {this.state.data.tags}</Segment></div>

		<div style={{padding:'3% 10% 2% 10%'}}><Segment color='olive'><span style={{fontWeight:'bold', fontSize:'17px',fontFamily:'Georgia serif'}}>Status :</span> {this.state.data.statusval}</Segment></div>

<div style={{padding:'3% 10% 2% 10%'}}><Segment color='olive'><span style={{fontWeight:'bold', fontSize:'17px',fontFamily:'Georgia serif'}}>Reporter :</span> {this.state.data.reporter}</Segment></div>

		<div style={{padding:'3% 10% 2% 10%'}}><Segment color='olive'><span style={{fontWeight:'bold', fontSize:'17px',fontFamily:'Georgia serif'}}>Assignee :</span> {this.state.data.assignee}</Segment></div>

		
		<div style={{padding:'3% 10% 2% 10%'}}><Segment color='olive'><span style={{fontWeight:'bold' , fontSize:'17px' , fontFamily:'Georgia serif'}}>Document :</span><Image src={this.state.data.doc} size='small' /></Segment></div>
	<div style={{padding:'5% 0px 0px 0px', textAlign:'center'}}>
	                      
        <Button color='green' style={style} as={Link} to={{pathname:"/editissue",state:{issueId:this.state.data.id, projectNumber:this.state.data.project} }} >Edit Issue</Button>
<Button  color='blue' as={Link} to={{pathname:"/comments",state:{issueId:this.state.data.id, userId:this.state.userId} }} >Comment</Button>

		<Button color='red' style={style} onClick={event=>this.deleteIssue(event)} >Delete Issue</Button>
                {this.renderRedirect()}
	</div>

</div>
    );

}
}

export default Individualissue;

