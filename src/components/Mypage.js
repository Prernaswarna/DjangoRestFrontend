import React , {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {Button} from 'semantic-ui-react';



class Mypage extends Component
{
        constructor(props)
        {
                super(props);
                this.state = { projects :[], assigned:[] ,reported:[], projectlist:[] , issuelist:[]};
        }
async componentDidMount()
{
        
        const response = await axios({url:'http://127.0.0.1:8000/project/',method:'GET' , withCredentials:true});
        const json = await response.data;
	const userId = this.props.location.state.userId;
	const res = await axios({url:'http://127.0.0.1:8000/bug/',method:'GET' , withCredentials:true});
        const js = await res.data;
        this.setState({projectlist:json});
	this.setState({issueslist:js});
  	let Newarr= [];
        for(let proj in this.state.projectlist)
        {
		for(let user in this.state.projectlist[proj]["project_members"])
		{
		
                if(this.state.projectlist[proj]["project_members"][user]  == userId)
                {
                        Newarr.push(this.state.projectlist[proj])

                }
		}
        }
        this.setState({projects:Newarr});




	let newarr= [];
        for(let bug in this.state.issuelist)
        {
               

                if(this.state.issuelist[bug]["reporter"]  == userId)
                {
                        newarr.push(this.state.issuelist[bug])

                }
                
        }
        this.setState({reported:Newarr});


	let arr= [];
        for(let bug in this.state.issuelist)
        {


                if(this.state.issuelist[bug]["assignee"]  == userId)
                {
                        arr.push(this.state.issuelist[bug])

                }

        }
        this.setState({assigned:arr});



}

render()
{
        return ( <div><p>Projects:</p>
        <ul>
          {this.state.projects.map(el => (
            <li>
             Project id : {el.id} , Project Name : {el.project_name} 
       
        </li>
          ))}
        </ul>
	
	
	
	<p>Reported Issues</p>
        <ul>
          {this.state.reported.map(el => (
            <li>
             Issue id : {el.id} , Issue Name : {el.heading} ,Issue Description : {el.description}

        </li>
          ))}
        </ul>
        


	
	<p>Assigned Issues</p>
        <ul>
          {this.state.assigned.map(el => (
            <li>
             Issue id : {el.id} , Issue Name : {el.heading} , Issue Description: {el.description}

        </li>
          ))}
        </ul>
        
	


	<Button as={Link} to={{pathname:"/projects" , state:{userId:this.props.location.state.userId , typeofuser:this.props.location.state.typeofuser} }} >View All Projects</Button>
	
	</div>
	
	);

}
}

export default Mypage;

