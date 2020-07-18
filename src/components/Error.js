import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {Button , Message} from 'semantic-ui-react';

 
const Error = () => {
    return (
       <div>
                <div style={{padding:'2% 10% 2% 10%'}}>
                <Message>
                <Message.Header>Error 404</Message.Header>
                <p>The page you are looking for does not exist.</p>
                </Message>
	     <div style={{textAlign:'center', padding:'1%'}}><Button color='green' as={Link} to={{pathname:"/" }} >Login Page</Button></div>
        </div>
        </div>

    );
}
 
export default Error;
