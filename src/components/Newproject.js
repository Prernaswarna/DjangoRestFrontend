import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Button, Dropdown, Form , Header} from 'semantic-ui-react';
import CKEditor from 'ckeditor4-react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';


axios.defaults.xsrfCookieName = 'frontend_csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class Newproject extends Component
{
        constructor(props)
        {
                super(props);
                this.state = {
		userlist : [],
                project_name : "",
                wiki : "<p>Not provided</p>",
                project_members:[],
                submittedData: [],
		redirect :false,
		userId:0,
		typeofuser:false,
		isLoggedIn:false,
		failed:false,
                };
                this.handleSubmit = this.handleSubmit.bind(this);
		this.onEditorChange = this.onEditorChange.bind(this);

        }
async componentDidMount()
{
	 const res = await axios({url:'http://127.0.0.1:8000/user/currentuser', method:'get' , withCredentials:true}).then(response=>{return response}).catch(error=>{window.location.href="http://127.0.0.1:3000/fail"})

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

	const response = await axios({ url : 'http://127.0.0.1:8000/user/' , method:'get' , withCredentials:true}).then(response=>{return response}).catch(error=>{window.location.href="http://127.0.0.1:3000/fail"})
	let arr = [];
	const ul = response.data;
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



handleNameChange = event => {
  this.setState({
    project_name: event.target.value
  })
}

onEditorChange(evt){
	this.setState({
		wiki:evt.editor.getData()
	});
}


handleWikiChange = event => {
  this.setState({
    wiki: event.target.value
  })
}


handleMemberChange=(event , data) => {
   
    let  opt= data.value;

 this.setState({project_members:opt});
}




 handleSubmit = event => {
  event.preventDefault()
  let formData = { project_name: this.state.project_name, wiki: this.state.wiki , project_members:this.state.project_members }
  axios({url:'http://127.0.0.1:8000/project/' ,method:'POST', data:formData , withCredentials:true} ).then(response=>{this.setState({redirect:true})}).catch(error=>{this.setState({failed:true})})
/*if(response.status==200)
{
	this.setState({redirect:true})
}
if(response.status==201)
{
	this.setState({redirect:true})
}*/
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
	const styl= this.state.isLoggedIn ? {display:''} : {display:'none'}
        return(
        <div style={styl}>
		<div style={{padding:'3% 10% 0px 10%'}}>
        <Header as='h2' textAlign='center'>
            <Header.Content>
                Add a New Project
      <Header.Subheader>Fill details about the project</Header.Subheader>
    </Header.Content>
  </Header>

        <Form onSubmit={event => this.handleSubmit(event)}>
	<Form.Field required>
      <label>Project-name</label>
      <input type="text" value={this.state.project_name} onChange={event => this.handleNameChange(event)} />
      </Form.Field>
		
	<Form.Field required>
	<label>Wiki</label>
      <CKEditor data={this.state.wiki} type="inline" onChange={this.onEditorChange} />
		<textarea style={{display:'none'}} value={this.state.wiki} onChange={this.handleWikiChange} readOnly/>
      
    <EditorPreview data={this.state.wiki} />
	</Form.Field>

	<Form.Field required>
<label>Project Members</label>
	<Dropdown name="project-members" onChange={(event,data) =>this.handleMemberChange(event , data)} placeholder="Select a category" fluid multiple search selection options = {this.state.userlist}
/>
  </Form.Field>

<div style={{padding:'5% 0px 0px 0px', textAlign:'center'}}>
<Button color='green' type="submit" >Submit Form</Button></div>		
		{this.renderRedirect()}
  </Form>
		</div>
   </div>
	);
}

}


class EditorPreview extends Component {
    render() {
        return (
            <div className="editor-preview">
                <br /><h4>Rendered content</h4>
                <div dangerouslySetInnerHTML={ { __html: this.props.data } }></div>
            </div>
        );
    }
}

EditorPreview.defaultProps = {
    data: ''
};

EditorPreview.propTypes = {
    data: PropTypes.string
};

export default Newproject
                              
