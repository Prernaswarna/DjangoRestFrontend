import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Form} from 'semantic-ui-react';
import {Icon ,Segment ,Message, Grid , Header ,Comment, Button} from 'semantic-ui-react';

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
		<div style={{padding:'2% 10% 2% 10%'}}>

		<Comments websocket={this.state.ws} issueId={this.props.location.state.issueId} />
		<div style={{padding:'2% 10% 2% 10%'}}><Header as='h3' >New Comments</Header></div>
					
		{this.state.data.map(el => (
		<Message size='tiny'>
		<Message.Header>
			<Icon circular name='user'/>
			User ID:{el.creator}
		</Message.Header>
		<p>
		{el.body}
		</p>
		</Message>
		))}
		
		</div>
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
                isLoggedIn:false,
		users:[]
		};
                this.handleSubmit = this.handleSubmit.bind(this);
        }

	async componentDidMount()
	{
	 const res = await axios({url:'http://127.0.0.1:8000/user/currentuser', method:'get' , withCredentials:true}).then(response=>{return response}).catch(error=>{window.location.href="http://127.0.0.1:3000/fail"})

        const js =  await res.data;
        console.log(res.data);
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
	

	 const response = await axios({url:'http://127.0.0.1:8000/comment/',method:'GET' , withCredentials:true}).then(response=>{return response}).catch(error=>{window.location.href="http://127.0.0.1:3000/fail"})
        const json = await response.data;
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
	const style= this.state.isLoggedIn ? {display:''} : {display:'none'}
        return(
        <div style={style}>
	<div style={{padding:'2% 10% 2% 10%'}}>
<Header as="h2">
<Header.Content>
      Comments
      <Header.Subheader>View all comments for issue {this.state.bug} </Header.Subheader>
    </Header.Content>
  </Header>	
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


	<Button color='green' type="submit" >Submit</Button>
  </Form>
	{this.state.commentlist.map(el=>(
                <Message size='tiny' >
                <Message.Header>
			<Icon circular name='user'/>
                        User ID:{el.creator}
                </Message.Header>
                <p>
                {el.body}
                </p>
                </Message>
        ))}
</div>
</div>
	);
}
}

export default Main;
