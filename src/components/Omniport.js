import React , {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import queryString from 'query-string';


class Omniport extends Component
{
        constructor(props)
        {
                super(props);
                this.state = { data :[]};
        }
async componentDidMount()
{
        const values = queryString.parse(this.props.location.search);
	console.log(values.code);

	const client_id='Z0D8JmQtXjXJxp63bsnt2HEGvWuw7sSRD19oZ4FO' ;
	const client_secret='hTgORjftOyZ0zikE5icUEUw22Q1RP3W3tRckzmZsIjBe2W9HegNsU71X9Ps1H8E6N6ZRu4cFhZqUnPf9MKAT8d5Kar9Drp8apcfNHyumFoR38n3JNSPahVmjv1cSmcGw';
	const grant_type='authorization_code' ;
	const redirect_url='http://127.0.0.1:3000/home' ;
	const code = values.code;
        const response = await axios({url:'http://127.0.0.1:8000/user/confirm/' ,method:'GET', params: {code:values.code} , withCredentials:true} );
        /*const json = await response.json();*/
	console.log(response);
}

render()
{
        return (<p>Done</p>
    );

}
}

export default Omniport;

