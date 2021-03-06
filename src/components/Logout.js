import React , {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {Segment,Message ,Button} from 'semantic-ui-react';


class Logout extends Component
{
        constructor(props)
        {
                super(props);
                this.state = { data :[] , isDisplayed:false,typeofuser:false,userId:0};
        }

	async componentDidMount()
	{
		const res = await axios({url:'http://127.0.0.1:8000/user/currentuser', method:'get' , withCredentials:true}).then(response=>{return response}).catch(error=>{window.location.href="http://127.0.0.1:3000/fail"})

        const js = await res.data;
        this.setState({typeofuser:js.typeofuser})
        this.setState({userId:js.userId});
	const response = await axios({url:'http://127.0.0.1:8000/user/logoutview' , method:'get' , withCredentials:true}).then(response=>{return response}).catch(error=>{window.location.href="http://127.0.0.1:3000/fail"})
	const json = await response.data;
	this.setState({data:json.user});
	}

	render()
{
        return (
     <div>
                <div style={{padding:'2% 10% 2% 10%'}}>
		<Message>
                <Message.Header>Logged out</Message.Header>
                <p>You have successfully loggedout</p>
                </Message>
        <div style={{textAlign:'center', padding:'1%'}}><Button color='green' as={Link} to={{pathname:"/" }} >Login</Button></div>
         </div>
</div>
    );

}
}

export default Logout;


