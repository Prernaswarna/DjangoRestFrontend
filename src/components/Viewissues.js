import React , {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {Button} from 'semantic-ui-react';



class Viewissues extends Component
{
        constructor()
        {
                super();
                this.state = { projectlist :[],
			arr:[]
		};
        }
async componentDidMount()
{
	const projectId = this.props.location.state.projectNumber;
        const response = await axios({url:'http://127.0.0.1:8000/bug/',method:'GET' , withCredentials:true});
        const json = await response.data;
        this.setState({projectlist:json});
        console.log(json);
	let Newarr= [];
	for(let proj in this.state.projectlist)
	{
		console.log(this.state.projectlist[proj]["project"]);
		console.log(this.state.projectlist[proj]);
		if(this.state.projectlist[proj]["project"] == projectId)
		{
			Newarr.push(this.state.projectlist[proj])
			
		}
	}
	this.setState({arr:Newarr});
	
}


render()
{
	const projectId = this.props.location.state.projectNumber;
        return (
      <div>
        <ul>
          {this.state.arr.map(el => (
            <li>
             <Link to={{
                      pathname : "/individualissue",
                      state :{issueId:  el.id }
                }} >

		  Issue id : {el.id} , Project Id : {el.project} , Title : {el.heading}
	</Link>
        </li>
          ))}
        </ul>
        <Button as={Link} to={{pathname:"/reportbug" , state:{projectNumber:projectId} }} >Add Issue</Button>

      </div>
    );

}
}

export default Viewissues;



