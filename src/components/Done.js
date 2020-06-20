import React , {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {Button , Message} from 'semantic-ui-react';



class Done extends Component
{
        constructor(props)
        {
                super(props);
                this.state = { data :[] , isDisplayed:false};
        }


render()
{
        return (
     <div>
                <Message>
		<Message.Header>Form Submitted</Message.Header>
		<p>Your form was successfully submitted.</p>
		</Message>
        <Button as={Link} to={{pathname:"/projects" }} >Continue</Button>
         </div>
    );

}
}


export default Done;
