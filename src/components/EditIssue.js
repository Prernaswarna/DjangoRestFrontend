import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Form} from 'semantic-ui-react';

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
                statusval : "Unassigned",
                submittedData: []

                };
                this.handleSubmit = this.handleSubmit.bind(this);
        }


	async componentDidMount()
	{	
	const isuueNum = this.props.location.state.issueId;
        const response = await fetch(`http://127.0.0.1:8000/bug/${issueNum}`);
        const json = await response.json();
        this.setState({data:json});
        console.log(json);
	this.setState({this.state.heading:this.state.data.heading})
	this.setState({this.state.description:this.state.data.description})
	this.setState({this.state.tags:this.state.data.tags})
	this.setState({this.state.reporter:this.state.data.reporter})
	this.setState({this.state.statusval:this.state.data.statusval})
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


handleStatusvalChange = event => {
  this.setState({
    statusval: event.target.value
  })
}


handleSubmit = event => {
  event.preventDefault()
  const isuueNum = this.props.location.state.issueId;
  let formData = { heading: this.state.heading, description: this.state.description , project:this.state.project , tags:this.state.tags ,reporter:this.state.reporter , statusval:this.state.statusval }
  const response = axios({url:`http://127.0.0.1:8000/bug/${issueNum}` ,method:'PUT', data:formData , withCredentials:true} );
  console.log(response);

}

listOfSubmissions = () => {
    return this.state.submittedData.map(data => {
      return <div><span>{data.heading}</span> <span>{data.description}</span> <span>{data.tags}</span> <span>{data.reporter}</span> <span>{data.stausval}</span></div>
    })
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

        <Form.Field>
        <label>Status</label>
      <input type="text"  value={this.state.statusval}  readonly />
        </Form.Field>
    <input type="submit" />
  </Form>
   {this.listOfSubmissions()}
</div>
);
}

}

export default Editissue





