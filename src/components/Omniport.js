import React , {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import queryString from 'query-string';
import {Link} from 'react-router-dom';
import {Button} from 'semantic-ui-react';

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

        return (<div><Button style={style} as={Link} to={{pathname:"/mypage" , state:{userId:this.state.userId , typeofuser:this.state.typeofuser} }} >My Page</Button>
	<Button loading style={style2}>Loading</Button></div>
);

   

}
}

export default Omniport;

