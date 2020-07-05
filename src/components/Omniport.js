import React , {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import queryString from 'query-string';
import {Link} from 'react-router-dom';
import {Button , Message} from 'semantic-ui-react';

class Omniport extends Component
{
        constructor(props)
        {
                super(props);
                this.state = { data :[],
		typeofuser : "False",
		userId:"5",
		isDisplayed:false};
        }
async componentDidMount()
{
        const values = queryString.parse(this.props.location.search);
	const code = values.code;
        const response = await axios({url:'http://127.0.0.1:8000/user/confirm/' ,method:'GET', params: {code:values.code} , withCredentials:true} );

	let user = await response.data;
	let userid = await user["userId"];
	let typeofUser = await["typeofuser"];
	

	await this.setState({typeofuser:user["typeofuser"]})
	await this.setState({userId:user["userId"]})
}

/*async componentDidUpdate(prevProps,prevState)
{
	if(this.state.typeofuser!="False")
	{
		console.log("It has been updated");
		
	}
}*/

render()
{
	
	const style = this.state.typeofuser!="False" ? { } : {display:'none'}
	const style2 = this.state.typeofuser!="False" ? {display:'none'} : {}

        return (<div style={{padding:'2% 10% 2% 10%'}}>
		<br />
		<br />
		<Message>
                <Message.Header>Logged In</Message.Header>
                <p>You have successfully logged in.</p>
                </Message>

		<br />
		<br />
		<div style={{textAlign:'center', padding:'1%'}}><Button color='green' style={style} as={Link} to={{pathname:"/mypage" , state:{userId:this.state.userId , typeofuser:this.state.typeofuser} }} >Continue</Button>
	</div>
	<div style={{textAlign:'center', padding:'1%'}}><Button loading style={style2}>Loading</Button></div>
		</div>
);

   

}
}

export default Omniport;

