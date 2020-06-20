import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Form} from 'semantic-ui-react';


axios.defaults.xsrfCookieName = 'frontend_csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'



class Main extends Component
{
	constructor(props)
	{
		super(props);
		this.state{ws:null}
	}
async componentDidMount()
{

        this.connect();
}

connect= () =>{
	var ws = new WebSocket('ws://localhost:3000/ws');
	let that = this;


	ws.onopen = () =>{
		console.log("Websocket connected");
		this.setState({ws:ws});
	};


	ws.onclose = e => {
		console.log("Socket is closed. Reconnect will be attempted");
		console.log(e.reason);
		this.connect();
	}

	ws.onerror = err => {
	
		console.log("Encountered error ",err.message , " closing socket");
	ws.close();
	}

	ws.onmessage = e =>{
		console.log(e.data);
	}
};

check = () =>{
	const {ws} = this.state;
	if(!ws||ws.readyState == WebSocket.CLOSED)
	{
		this.connect();
	}
};

	render()
	{
		return <Comment websocket={this.state.ws} />
	}
}





class Comments extends Component
{
        constructor(props)
        {
                super(props);
                this.state = { data :[],
                bug : this.props.location.state.issueId,
                creator : this.props.location.state.userId,
                body:"Not provided",
                submittedData: [],
               
		};
                this.handleSubmit = this.handleSubmit.bind(this);
        }



handleSubmit = event => {
 const {websocket}  = this.props 
  event.preventDefault()
  try{
  websocket.send(JSON.stringify({
	  'bug' : this.state.bug,
	  'creator':this.state.creator ,
	  'body' : this.state.body 
	 }));
  }
  catch(err){
	  console.log("Try catch fail" , err.message);
}
}




render()
{
        return(
        <div>
        <Form onSubmit={event => this.handleSubmit(event)}>
        <Form.Field>
      <label>Issue Id</label>
      <input type="text" value={this.props.location.state.issueId} readonly/>
      </Form.Field>

        <Form.Field>
        <label>Creator</label>
      <input type="text"  value={this.props.location.state.userId} readonly/>
      </Form.Field>

        <Form.Field>
        <label>Body</label>
      <input type="text" onChange={event => this.handleBodyChange(event)}  value={this.state.body} />
	</Form.Field>


	<input type="submit" />
  </Form>
	);
}
}

export default Comments;
