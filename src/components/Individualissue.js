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
                this.state = { data :[],projectinfo:[],isDisplayed:false,typeofuser:false,userId:0 , reportername:"" , assigneename:"" , failed:false};
        	this.deleteIssue = this.deleteIssue.bind(this);
	}
async componentDidMount()
{
        const issueId = this.props.location.state.issueId;
        const response = await axios({url:`http://127.0.0.1:8000/bug/${issueId}` , method:'GET' , withCredentials:true}).then(response=>{return response}).catch(error=>{window.location.href="http://127.0.0.1:3000/fail"})
	const projectId = this.props.location.state.projectNumber;
	const res = await axios({url:`http://127.0.0.1:8000/project/${projectId}` , method:'GET' , withCredentials:true}).then(response=>{return response}).catch(error=>{window.location.href="http://127.0.0.1:3000/fail"})
        const json = await response.data;
	const js = await res.data;
        this.setState({data:json});
	this.setState({projectinfo:js});
	
	const reporterinfo = await axios({url:`http://127.0.0.1:8000/user/${this.state.data.reporter}` , method:'GET' , withCredentials:true}).then(response=>{return response}).catch(error=>{window.location.href="http://127.0.0.1:3000/fail"})
	const reporterjson = await reporterinfo.data;
	
	this.setState({reportername:reporterjson.username});
	
	if(this.state.data.assignee!=null)
	{
		const assigneeinfo = await axios({url:`http://127.0.0.1:8000/user/${this.state.data.assignee}` , method:'GET' , withCredentials:true}).then(response=>{return response}).catch(error=>{window.location.href="http://127.0.0.1:3000/fail"})
        const assigneejson = await assigneeinfo.data;

        this.setState({assigneename:assigneejson.username});

	}
	const resp = await axios({url:'http://127.0.0.1:8000/user/currentuser', method:'get' , withCredentials:true}).then(response=>{return response}).catch(error=>{window.location.href="http://127.0.0.1:3000/fail"})

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
   axios({url:`http://127.0.0.1:8000/bug/${issueId}` ,method:'DELETE' , withCredentials:true} ).then(response=>{this.setState({redirect:true}); }).catch(error=>{this.setState({failed:true}); })

}

renderRedirect= () =>{
        if(this.state.redirect==true)
        {
                return <Redirect to={{pathname:'/deletedone'  }}/>
        }
	 else if(this.state.failed==true)
        {
                return <Redirect to={{pathname:'/fail'  }}/>
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
		
		<div style={{padding:'3% 10% 2% 10%'}}><Segment color='olive'><span style={{fontWeight:'bold', fontSize:'15px',fontFamily:'Arial , Helvetica , sans-serif'}}>Issue Id :</span> {this.state.data.id}</Segment></div>

		<div style={{padding:'3% 10% 2% 10%'}}><Segment color='olive'><span style={{fontWeight:'bold', fontSize:'15px',fontFamily:'Arial , Helvetica , sans-serif'}}>Project Id :</span> {this.state.data.project}</Segment></div>

		<div style={{padding:'3% 10% 2% 10%'}}><Segment color='olive'><span style={{fontWeight:'bold', fontSize:'15px',fontFamily:'Arial , Helvetica , sans-serif'}}>Project Name :</span> {this.props.location.state.projectNames}</Segment></div>

	<div style={{padding:'3% 10% 2% 10%'}}><Segment color='olive'><span style={{fontWeight:'bold', fontSize:'15px',fontFamily:'Arial , Helvetica , sans-serif'}}>Title :</span> {this.state.data.heading}</Segment></div>

	<div style={{padding:'3% 10% 2% 10%'}}><Segment color='olive'><span style={{fontWeight:'bold', fontSize:'15px',fontFamily:'Arial , Helvetica , sans-serif'}}>Description :</span> {this.state.data.description}</Segment></div>

	<div style={{padding:'3% 10% 2% 10%'}}><Segment color='olive'><span style={{fontWeight:'bold', fontSize:'15px',fontFamily:'Arial , Helvetica , sans-serif'}}>Tags :</span> {this.state.data.tags}</Segment></div>

		<div style={{padding:'3% 10% 2% 10%'}}><Segment color='olive'><span style={{fontWeight:'bold', fontSize:'15px',fontFamily:'Arial , Helvetica ,sans-serif'}}>Status :</span> {this.state.data.statusval}</Segment></div>

<div style={{padding:'3% 10% 2% 10%'}}><Segment color='olive'><span style={{fontWeight:'bold', fontSize:'15px',fontFamily:'Arial , Helvetica ,sans-serif'}}>Reporter :</span> {this.state.data.reporter}  {this.state.reportername}</Segment></div>

		<div style={{padding:'3% 10% 2% 10%'}}><Segment color='olive'><span style={{fontWeight:'bold', fontSize:'15px',fontFamily:'Arial , Helvetica , sans- serif'}}>Assignee :</span> {this.state.data.assignee}  {this.state.assigneename}</Segment></div>

		
		<div style={{padding:'3% 10% 2% 10%'}}><Segment color='olive'><span style={{fontWeight:'bold' , fontSize:'15px' , fontFamily:'Arial , Helvetice , sans-serif'}}>Document :</span><Image src={this.state.data.doc} size='small' /></Segment></div>
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

