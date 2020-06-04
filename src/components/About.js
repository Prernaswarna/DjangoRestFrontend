import React , {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
 
class About extends Component
{
	constructor()
	{
		super();
		this.state = { data :[]};
	}
async componentDidMount()
{
	const response = await fetch('http://127.0.0.1:8000/user/');
	const json = await response.json();
	this.setState({data:json});
	console.log(json);
}

render()
{
	return (
      <div>
        <ul>
          {this.state.data.map(el => (
            <li>
              {el.id}: {el.username} , {el.email} , {el.enroll}
            </li>
          ))}
        </ul>
      </div>
    );

}
}
 
export default About;
