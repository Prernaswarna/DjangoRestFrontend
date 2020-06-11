import React ,{Component} from 'react';
import { Button, Form } from 'semantic-ui-react';
import ReactDOM from 'react-dom';
import axios from 'axios';


axios.defaults.xsrfCookieName = 'frontend_csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class Reportbug extends Component
{
        constructor(props)
        {
                super(props);
                this.state = { data :[]};
		this.handleSubmit = this.handleSubmit.bind(this);
        }
async componentDidMount()
{

        const response = await fetch('http://127.0.0.1:8000/user/');
        const json = await response.json();
        this.setState({data:json});
        console.log(json);
}

handleSubmit(event) {
         event.preventDefault();
	const values= new FormData(event.target);
	console.log(values);
	const response = axios({url:'http://127.0.0.1:8000/bug/' ,method:'POST', data:values , withCredentials:true} );
	console.log(response);
      };


render()
{
	return(

  <Form onSubmit={this.handleSubmit}>
    <Form.Field>
      <label>Project-id</label>
      <input name="project" placeholder={this.props.location.state.projectNumber} readOnly/>
    </Form.Field>
    <Form.Field required>
      <label>Heading</label>
      <input nem="heading" placeholder='Heading' />
    </Form.Field>
    <Form.Field>
      <label>Description</label>
      <input name="description" placeholder='Description' />
    </Form.Field>
    <label>Select a file</label>
    <input name="doc" type='file'/>
	<Form.Field required>
      <label>Tags</label>
      <input name="tags" placeholder='Tags' />
    </Form.Field>
    <Form.Field required>
      <label>Reporter</label>
      <input name="reporter" placeholder='Reporter' />
    </Form.Field>
    <Form.Field>
      <label>Status</label>
      <input name="status" placeholder='Unassigned' readOnly />
    </Form.Field>
	
    <Button type='submit'>Submit</Button>
  </Form>
);
}

}

export default Reportbug
