import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Form,Dropdown} from 'semantic-ui-react';
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


handleHeadingChange = event => {
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
}


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
  let formData = { heading: this.state.heading, description: this.state.description , project:this.state.project , tags:this.state.tags ,reporter:this.state.reporter , assignee:this.state.assignee ,statusval:this.state.statusval }
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
        <div>
        <Form onSubmit={event => this.handleSubmit(event)}>
        <Form.Field>
      <label>Project-id</label>
      <input type="text" value={this.props.location.state.projectNumber} readonly/>
      </Form.Field>

        <Form.Field required>
        <label>Heading</label>
      <input type="text" onChange={event => this.handleHeadingChange(event)} value={this.state.heading} required/>
      </Form.Field>
<Form.Field>
        <label>Description</label>
      <input type="text" onChange={event => this.handleDescriptionChange(event)}  value={this.state.description} />
      </Form.Field>

        <Form.Field required>
        <label>Tags</label>
      <input type="text" onChange={event => this.handleTagsChange(event)} value={this.state.tags} required/>
      </Form.Field>

        <Form.Field required>
        <label>Reporter</label>
      <input type="text" onChange={event => this.handleReporterChange(event)} value={this.state.reporter} required/>
      </Form.Field>


	<Form.Field >
	<label>Assignee</label>
	<Dropdown name="assigned" value={this.state.assignee} onChange={(event,data) =>this.handleAssigneeChange(event , data)}  fluid selection options = {this.state.userlist}
/>

	</Form.Field>


        <Form.Field>
        <label>Status</label>
      <input type="text"  value={this.state.statusval}  readonly />
        </Form.Field>
    <input type="submit" />
		{this.renderRedirect()}

  </Form>
   
</div>
);
}

}

export default Editissue





