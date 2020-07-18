import React , {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {Button , Message} from 'semantic-ui-react';



class Fail extends Component
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
                <div style={{padding:'2% 10% 2% 10%'}}>
                <Message>
                <Message.Header>Error Occured</Message.Header>
                <p>An error occured .Please try again later.</p>
                </Message>
        <div style={{textAlign:'center', padding:'1%'}}><Button color='green' as={Link} to={{pathname:"/mypage" }} >Continue</Button></div>
        </div>
        </div>
    );

}
}


export default Fail;

