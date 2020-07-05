import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Segment,Image ,Header,Button ,Form,Dropdown} from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';

axios.defaults.xsrfCookieName = 'frontend_csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class Editissue extends Component
{
        constructor(props)
        {
                super(props);
                this.state = { data :[],
                project : this.props.location.state.projectNumber,
                heading : "Not provided",
                description:"Not provided",
                tags:"Not provided",
                reporter:"1",
		assignee:null,
                statusval : "Unassigned",
                submittedData: [],
		redirect:false,
		userId:0,
		typeofuser:false,
		userlist:[]
                };
                this.handleSubmit = this.handleSubmit.bind(this);
        	this.fileInput = React.createRef();
	}


	async componentDidMount()
	{	
	const issueId = this.props.location.state.issueId;
        const response = await fetch(`http://127.0.0.1:8000/bug/${issueId}`);
        const json = await response.json();
        this.setState({data:json});
        console.log(json);
	this.setState({heading:this.state.data.heading})
	this.setState({description:this.state.data.description})
	this.setState({tags:this.state.data.tags})
	this.setState({reporter:this.state.data.reporter})
	this.setState({statusval:this.state.data.statusval})
	this.setState({assignee:this.state.data.assignee})
	const res = await axios({url:'http://127.0.0.1:8000/user/currentuser', method:'get' , withCredentials:true})

        const js = await res.data;
        this.setState({typeofuser:js.typeofuser})
        this.setState({userId:js.userId});

	const re = await axios({ url : 'http://127.0.0.1:8000/user/' , method:'get' , withCredentials:true})

        let arr = [];
        const ul = re.data;
        for(let user in ul)
        {
                let dict = {};
                dict["key"] = user;
                dict["value"] = ul[user]["id"];
                dict["text"] = ul[user]["username"];
                arr.push(dict);
        }
        this.setState({
                userlist:arr
        })

	}


/*handleHeadingChange = event => {
  this.setState({
    heading: event.target.value
  })
}


handleDescriptionChange = event => {
  this.setState({
    description: event.target.value
  })
}


handleTagsChange = event => {
  this.setState({
    tags: event.target.value
  })
}*/


handleReporterChange = event => {
  this.setState({
    reporter: event.target.value
  })
}

handleAssigneeChange = (event,data) => {
	/*this.setState({
		assignee:event.target.value
	})*/
	let  opt= data.value;
    this.setState({assignee:opt});

}


handleStatusvalChange = event => {
  this.setState({
    statusval: event.target.value
  })
}


handleSubmit = event => {
  event.preventDefault()
  const issueId = this.props.location.state.issueId;
  const formData = new FormData();

  formData.append("heading" , this.state.heading);
        formData.append("description" , this.state.description);
        formData.append("project" , this.state.project);
        formData.append("tags" , this.state.tags);
        formData.append("reporter" , this.state.reporter);
	if(this.state.assignee!=null)
	{
	formData.append("assignee" , this.state.assignee);
	}
        formData.append("statusval" , this.state.statusval);
	if(this.fileInput.current.files[0]!=undefined)
	{	formData.append("doc" , this.fileInput.current.files[0]);
	}

 /* let formData = { heading: this.state.heading, description: this.state.description , project:this.state.project , tags:this.state.tags ,reporter:this.state.reporter , assignee:this.state.assignee ,statusval:this.state.statusval }
  */
  const response = axios({url:`http://127.0.0.1:8000/bug/${issueId}/` ,method:'PUT', data:formData , withCredentials:true} );
  console.log(response);
	this.setState({redirect:true});
}

renderRedirect= () =>{
        if(this.state.redirect==true)
        {
                return <Redirect to={{pathname:'/done'  }}/>
        }
}




render()
{
        return(
        <div style={{padding:'3% 10% 0px 10%'}}>
        <Header as='h2' textAlign='center'>
	    <Header.Content>
                Issue : {this.state.heading}
      <Header.Subheader>Edit details</Header.Subheader>
    </Header.Content>
  </Header>

		
	<Form onSubmit={event => this.handleSubmit(event)}>
        <Form.Field>
      <label>Project-id</label>
      <input type="text" value={this.props.location.state.projectNumber} readonly/>
      </Form.Field>

        <Form.Field >
        <label>Heading</label>
      <input type="text"  value={this.state.heading} readonly/>
      </Form.Field>
<Form.Field>
        <label>Description</label>
      <input type="text"   value={this.state.description} readonly/>
      </Form.Field>

        <Form.Field >
        <label>Tags</label>
      <input type="text" value={this.state.tags} readonly/>
      </Form.Field>

        <Form.Field >
        <label>Reporter</label>
      <input type="text" onChange={event => this.handleReporterChange(event)} value={this.state.reporter} />
      </Form.Field>


	<Form.Field >
	<label>Assignee</label>
	<Dropdown name="assigned" value={this.state.assignee} onChange={(event,data) =>this.handleAssigneeChange(event , data)}  fluid selection options = {this.state.userlist}
/>

	</Form.Field>


        <Form.Field>
        <label>Status</label>
      <input type="text"  onChange={event => this.handleStatusvalChange(event)} value={this.state.statusval}   />
        </Form.Field>

	<label style={{fontWeight:'bold' ,fontSize:'13px'}}>Document <Image src={this.state.data.doc} size='small' /></label>

	<label style={{fontWeight:'bold' ,fontSize:'13px'}}>Replace File</label>
        <input type="file" ref={this.fileInput}/>

    <div style={{padding:'5% 0px 0px 0px', textAlign:'center'}}>
<Button color='green' type="submit" >Submit</Button></div>
		{this.renderRedirect()}

  </Form>
   
</div>
);
}

}

export default Editissue




