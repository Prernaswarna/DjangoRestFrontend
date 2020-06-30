import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Form , Button} from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';


axios.defaults.xsrfCookieName = 'frontend_csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class Reportbug extends Component
{
        constructor(props)
        {
                super(props);
                this.state = { data :[],
		project : this.props.location.state.projectNumber,
		heading : "Not provided",
		description:"Not provided",
		tags:"Not provided",
		statusval : "Unassigned",
		submittedData: [],
		redirect:false,
		typeofuser:false,
		userId:0

		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.fileInput = React.createRef();
        }
async componentDidMount()
{

        const response = await fetch('http://127.0.0.1:8000/user/');
        const json = await response.json();
        this.setState({data:json});
        console.log(json);
	const res = await axios({url:'http://127.0.0.1:8000/user/currentuser', method:'get' , withCredentials:true})

        const js = await res.data;
        this.setState({typeofuser:js.typeofuser})
        this.setState({userId:js.userId});
	
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


/*handleFileChange = event => {
 this.setState({
   fileInput:this.fileInput.current.files[0]
})
console.log(this.state.fileInput);
console.log(event.target.files[0]);
}*/



async handleSubmit(event) {
  event.preventDefault()
/*const toBase64 = file => new Promise((resolve, reject) => {
 const reader = new FileReader();
 reader.readAsDataURL(file);
 reader.onload = () => resolve(reader.result);
 reader.onerror = error => reject(error);
 });*/
  const formData = new FormData();
  formData.append("heading" , this.state.heading);
	formData.append("description" , this.state.description);
	formData.append("project" , this.state.project);
	formData.append("tags" , this.state.tags);
	formData.append("reporter" , this.state.userId);
	formData.append("statusval" , this.state.statusval);
	if(this.fileInput.current.files[0]!=undefined)
        {       formData.append("doc" , this.fileInput.current.files[0]);
        }

  	
  /*let formData = { heading: this.state.heading, description: this.state.description , project:this.state.project , tags:this.state.tags ,reporter:this.state.userId , statusval:this.state.statusval , doc: file}
  */
const response = axios({url:'http://127.0.0.1:8000/bug/' ,method:'POST', data:formData , withCredentials:true } );
  console.log(response);
	console.log(this.fileInput.current.files[0]);
	console.log(formData);

	 const projectId = this.state.project;
        const respon = await fetch(`http://127.0.0.1:8000/project/${projectId}`);
        const jso = await respon.json();
		console.log(jso);
	for(let user in jso["project_members"])
	{
		console.log(jso["project_members"][user]);
		let id = jso["project_members"][user];
		const use = await fetch(`http://127.0.0.1:8000/user/${id}`);
		const userdata = await use.json();
		let em = userdata["email"]
		const respon = await axios({url:'http://127.0.0.1:8000/user/sendemail',method:'GET' , params:{email:em , message:'An issue has been added to your project' , subject:'Addition of issue'}, withCredentials:true});
        console.log(respon);
	}

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
		
	<Form.Field >	
	<label>Reporter</label>
      <input type="text"  value={this.state.userId} readonly/>
      </Form.Field>
		
	<Form.Field>	
	<label>Status</label>
      <input type="text"  value={this.state.statusval}  readonly />
	</Form.Field>
	
	<label>File</label>
	<input type="file" ref={this.fileInput}/>
	
    <Button type="submit">Submit</Button>
	{this.renderRedirect()}
  </Form>
   
</div>
);
}

}

export default Reportbug
