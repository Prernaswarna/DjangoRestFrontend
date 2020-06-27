import React , {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {Button, Grid} from 'semantic-ui-react';



class Viewissues extends Component
{
        constructor()
        {
                super();
                this.state = { projectlist :[],
			arr:[],
			typeofuser:false,
			userId:0,
		};
        }
async componentDidMount()
{
	const projectId = this.props.location.state.projectNumber;
        const response = await axios({url:'http://127.0.0.1:8000/bug/',method:'GET' , withCredentials:true});
        const json = await response.data;
        this.setState({projectlist:json});
       
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
	const res = await axios({url:'http://127.0.0.1:8000/user/currentuser', method:'get' , withCredentials:true})

        const js = await res.data;
        this.setState({typeofuser:js.typeofuser})
        this.setState({userId:js.userId});
	
}


render()
{
	const s1 = this.state.arr && this.state.arr.length>0 ? {display:''} : {display:'none'}
	const projectId = this.props.location.state.projectNumber;
        return (
      <div>
        <Grid columns={3} style={s1} divided>
	<Grid.Row>
	<Grid.Column>
		Issue Id
	</Grid.Column>
	<Grid.Column>
		Project Id
	</Grid.Column>
	<Grid.Column>
		Issue Description
	</Grid.Column>
	</Grid.Row>
          {this.state.arr.map(el => (
            <Grid.Row>
	    <Grid.Column>
	    {el.id}
	     </Grid.Column>
	     <Grid.Column>
		    {el.project}
	     </Grid.Column>
	     <Grid.Column>
		  <Link to={{
                      pathname : "/individualissue",
                      state :{issueId:  el.id ,projectNumber:this.props.location.state.projectNumber}
                }} >

		 {el.heading}
		 </Link>
	     </Grid.Column>
	
        </Grid.Row>
          ))}
        </Grid>
        <Button as={Link} to={{pathname:"/reportbug" , state:{projectNumber:projectId} }} >Add Issue</Button>

      </div>
    );

}
}

export default Viewissues;



