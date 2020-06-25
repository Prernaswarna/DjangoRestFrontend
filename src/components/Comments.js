import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Form} from 'semantic-ui-react';
import {Segment ,Message, Grid , Header , Button} from 'semantic-ui-react';

axios.defaults.xsrfCookieName = 'frontend_csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'



class Main extends Component
{
	constructor(props)
	{
		super(props);
		this.state={ws:null , data:[] };
	}
async componentDidMount()
{

        this.connect();
	console.log("Called Connect");
}

connect= () =>{
	var ws = new WebSocket('ws://localhost:8000/ws/chat/');
	let that = this;
	console.log("Inside connect");
	console.log(ws);
	console.log(ws.readyState);
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
		let thistime = JSON.parse(e.data);
		console.log(thistime);
		var addeddata = this.state.data;
		addeddata.push(thistime);
		this.setState({data:addeddata});
		console.log(this.state.data);
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
		return <div>
		<Comments websocket={this.state.ws} issueId={this.props.location.state.issueId} />
		<Header as='h3' >New Comments</Header>
					
		{this.state.data.map(el => (
		<Message size='tiny'>
		<Message.Header>
			User ID:{el.creator}
		</Message.Header>
		<p>
		{el.body}
		</p>
		</Message>
		))}
		
		
		</div>
		
	}
}





class Comments extends Component
{
        constructor(props)
        {
                super(props);
                this.state = { data :[],
                bug : this.props.issueId,
                creator : 1,
                body:"Not provided",
                commentlist: [],
               
		};
                this.handleSubmit = this.handleSubmit.bind(this);
        }

	async componentDidMount()
	{
	 const response = await fetch('http://127.0.0.1:8000/comment/');
        const json = await response.json();
       console.log(this.state.bug);
		
	this.setState({data:json});
	let arr=[];
	for(let com in this.state.data)
	{

		if(this.props.issueId == this.state.data[com]["bug"])
		{
			arr.push(this.state.data[com]);
		}
	}
	this.setState({commentlist:arr});
	console.log(this.state.commentlist);
	const res = await axios({url:'http://127.0.0.1:8000/user/currentuser', method:'get' , withCredentials:true})

        const js = await res.data;
        this.setState({creator:js.userId});
	
	}

handleBodyChange = event => {
  this.setState({
    body: event.target.value
  })
}


handleSubmit = event => {
 const websocket  = this.props.websocket
console.log(websocket);
console.log(this.props);
console.log(this.props.websocket);
  event.preventDefault();
  try{
  websocket.send(JSON.stringify({
	  'bug':this.state.bug,
	  'creator' : this.state.creator,
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
      <input type="text" value={this.state.bug} readOnly/>
      </Form.Field>

        <Form.Field>
        <label>UserID</label>
      <input type="text"  value={this.state.creator} readOnly/>
      </Form.Field>

        <Form.Field>
        <label>Body</label>
      <input type="text" onChange={event => this.handleBodyChange(event)}  value={this.state.body} />
	</Form.Field>


	<Button type="submit" >Submit</Button>
  </Form>
	{this.state.commentlist.map(el=>(
                <Message size='tiny'>
                <Message.Header>
                        User ID:{el.creator}
                </Message.Header>
                <p>
                {el.body}
                </p>
                </Message>
        ))}

</div>
	);
}
}

export default Main;
