import React , {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {Redirect ,Link} from 'react-router-dom';
import {Button} from 'semantic-ui-react';
import {Header, Dropdown, Form } from 'semantic-ui-react';
import CKEditor from 'ckeditor4-react';
import PropTypes from 'prop-types';


axios.defaults.xsrfCookieName = 'frontend_csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'


class Editproject extends Component
{
        constructor(props)
        {
                super(props);
                this.state = { 
			data :[],
                        userlist : [],
                project_name : "Not provided",
                wiki : "<p>Not provided</p>",
                project_members:[],
                submittedData: [],
		redirect : false,
		typeofuser:false,
		userId:0,
		isLoggedIn:false,
		};
		this.handleSubmit = this.handleSubmit.bind(this);
                this.onEditorChange = this.onEditorChange.bind(this);
        }
async componentDidMount()
{
	 const re = await axios({url:'http://127.0.0.1:8000/user/currentuser', method:'get' , withCredentials:true})

        const js = await re.data;
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



        const projectId = this.props.location.state.projectNumber;
        const response = await fetch(`http://127.0.0.1:8000/project/${projectId}`);
        const json = await response.json();
        this.setState({data:json});

	this.setState({project_name:this.state.data.project_name})
	this.setState({wiki:this.state.data.wiki})
	this.setState({project_members:this.state.data.project_members})
	




	const res = await axios({ url : 'http://127.0.0.1:8000/user/' , method:'get' , withCredentials:true})
	
   	let arr = [];
        const ul = res.data;
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
   console.log(this.state.project_members)
  const projectId = this.props.location.state.projectNumber;
  let formData = { project_name: this.state.project_name, wiki: this.state.wiki , project_members:this.state.project_members }
  const response = axios({url:`http://127.0.0.1:8000/project/${projectId}/` ,method:'PUT', data:formData , withCredentials:true} );
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
	const styl= this.state.isLoggedIn ? {display:''} : {display:'none'} 
        return(
        <div style={styl}>
	<div style={{padding:'3% 10% 0px 10%'}}>
        <Header as='h2' textAlign='center'>
            <Header.Content>
                Project Number : {this.state.id}
      <Header.Subheader>Edit details</Header.Subheader>
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
<Dropdown name="project-members" value={this.state.project_members} onChange={(event,data) =>this.handleMemberChange(event , data)}  fluid multiple selection options = {this.state.userlist}
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
                <h2>Rendered content</h2>
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



export default Editproject
