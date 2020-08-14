import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Form ,Header, Button , Radio} from 'semantic-ui-react';
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
		heading : "",
		description:"Not provided",
		tags:"",
		statusval : "Unassigned",
		submittedData: [],
		redirect:false,
		typeofuser:false,
		userId:0,
		failed:false

		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.fileInput = React.createRef();
        }
async componentDidMount()
{

        const response = await axios({url:'http://127.0.0.1:8000/user/',method:'GET',withCredentials:true}).then(response=>{return response}).catch(error=>{window.location.href="http://127.0.0.1:3000/fail"})
        const json = await response.data;
        this.setState({data:json});
        console.log(json);
	const res = await axios({url:'http://127.0.0.1:8000/user/currentuser', method:'get' , withCredentials:true}).then(response=>{return response}).catch(error=>{window.location.href="http://127.0.0.1:3000/fail" })
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
	await  axios({url:'http://127.0.0.1:8000/bug/' ,method:'POST', data:formData , withCredentials:true } ).then(response=>{console.log(response)}).catch(error=>{this.setState({failed:true});})
	const projectId = this.state.project;
        const jso =await axios({url:`http://127.0.0.1:8000/project/${projectId}`,method:'GET',withCredentials:true}).then(response=>{return response.data}).catch(error=>{this.setState({failed:true})})
        
                console.log(jso);
	 
         for(let user in jso["project_members"])
        {
                console.log(jso["project_members"][user]);
                let id = jso["project_members"][user];
                const userdata = await axios({url:`http://127.0.0.1:8000/user/${id}`,method:'GET',withCredentials:true}).then(response=>{return response.data}).catch(error=>{this.setState({failed:true})})
                
                let em = userdata["email"]
                await axios({url:'http://127.0.0.1:8000/user/sendemail',method:'GET' , params:{email:em , message:'An issue has been added to your project' , subject:'Addition of issue'}, withCredentials:true}).then(response=>{console.log(response)}).catch(error=>{this.setState({failed:true})})
        }

	this.setState({redirect:true});
	
	
}


renderRedirect= () =>{
        if(this.state.redirect==true)
        {
                return <Redirect to={{pathname:'/done'  }}/>
        }
	else if(this.state.failed==true)
        {
                return <Redirect to={{pathname:'/fail'  }}/>
        }
}


render()
{
	return(
	<div>
	<div style={{padding:'3% 10% 0px 10%'}}>
        <Header as='h2' textAlign='center'>
            <Header.Content>
                Add Issue 
      <Header.Subheader>Add details of new issue</Header.Subheader>
    </Header.Content>
  </Header>

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
        <Radio label='Unassigned' value='Unassigned' checked={this.state.statusval==='Unassigned'} defaultChecked disabled />
        <Radio label='Assigned' value='Assigned' checked={this.state.statusval==='Assigned'} disabled />
        </Form.Field>

	
	<label style={{fontWeight:'bold' ,fontSize:'13px'}}>Document</label>
	<input type="file" ref={this.fileInput}/>
	<div style={{padding:'5% 0px 0px 0px', textAlign:'center'}}>	
    <Button color='green' type="submit">Submit Form</Button></div>
	{this.renderRedirect()}
  </Form>
</div>   
</div>
);
}

}

export default Reportbug
