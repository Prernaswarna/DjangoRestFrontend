import React , {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {Button, Grid , Header} from 'semantic-ui-react';



class Mypage extends Component
{
        constructor(props)
        {
                super(props);
                this.state = { projects :[], assigned:[] ,reported:[], projectlist:[] , issueslist:[] , isDisplayed:false};
        }
async componentDidMount()
{
	console.log(this.props.location.state.typeofuser);
        const response = await axios({url:'http://127.0.0.1:8000/project/',method:'GET' , withCredentials:true});
        const json = await response.data;
	const res = await axios({url:'http://127.0.0.1:8000/bug/',method:'GET' , withCredentials:true});
        const js = await res.data;
        await this.setState({projectlist:json});
	await this.setState({issueslist:js});
  	let Newarr= [];
        for(let proj in this.state.projectlist)
        {
		for(let user in this.state.projectlist[proj]["project_members"])
		{
			
		
                if(this.state.projectlist[proj]["project_members"][user]  == this.props.location.state.userId)
                {
                        Newarr.push(this.state.projectlist[proj])

                }
		}
        }
         await this.setState({projects:Newarr});




	let newarr= [];
        for(let bug in this.state.issueslist)
        {
               

                if(this.state.issueslist[bug]["reporter"]  == this.props.location.state.userId)
                {
                        newarr.push(this.state.issueslist[bug])

                }
                
        }
         await this.setState({reported:newarr});


	let arr= [];
        for(let bug in this.state.issueslist)
        {


                if(this.state.issueslist[bug]["assignee"]  == this.props.location.state.userId)
                {
                        arr.push(this.state.issueslist[bug])

                }

        }
         await this.setState({assigned:arr});

	if(this.props.location.state.typeofuser==true)
		await this.setState({isDisplayed:true})
	/*console.log(this.state.issueslist);
	console.log(this.state.projectlist);
	console.log(this.state.projects);
	console.log(this.state.assigned);
	console.log(this.state.reported);
	console.log(this.props.location.state.userId);
	console.log(this.props.location.state.typeofuser);*/
	const respon = await axios({url:'http://127.0.0.1:8000/user/sendemail',method:'GET' , params:{email:'prernaswarna@gmail.com'}, withCredentials:true});
	console.log(respon);
}

render()
{
	const style = this.state.isDisplayed ? {display:''} : {display:'none'}
	const s1 = this.state.projects && this.state.projects.length>0 ? {display:''}:{display:'none'}
	const s2 = this.state.assigned && this.state.assigned.length>0 ? {display:''} : {display:'none'}
	const s3 = this.state.reported && this.state.reported.length>0 ? {display:''} : {display:'none'}
	
        return (<div><Header as='h3' style={s1}>Projects</Header>
        <Grid style={s1} columns={2} divided>
	<Grid.Row>
	<Grid.Column>
		Project Id
	</Grid.Column>
	<Grid.Column>
		Project Name
	</Grid.Column>
	</Grid.Row>
	
          {this.state.projects.map(el => (
            <Grid.Row>
	    <Grid.Column>
              {el.id} 
	    </Grid.Column>
	    <Grid.Column>
		 {el.project_name} 
	    </Grid.Column>
            </Grid.Row>
       
          ))}
        </Grid>
	
	
	
	<Header as='h3' style={s3}>Reported Issues</Header>
	<Grid style={s3} columns={3} divided>
        <Grid.Row>
        <Grid.Column>
                Issue Id
        </Grid.Column>
        <Grid.Column>
                Issue Title
        </Grid.Column>
	<Grid.Column>
		Issue Description
	</Grid.Column>
        </Grid.Row>

  
          {this.state.reported.map(el => (
            <Grid.Row>
	<Grid.Column>
              {el.id}
	</Grid.Column>
	<Grid.Column>
	 {el.heading} 
	</Grid.Column>
	<Grid.Column>
	{el.description}
	</Grid.Column>

	</Grid.Row>
          ))}
        </Grid>
        


	
	<Header style={s2} as='h3'>Assigned Issues</Header>
	<Grid style={s2} columns={3} divided>
        <Grid.Row>
        <Grid.Column>
                Issue Id
        </Grid.Column>
        <Grid.Column>
                Issue Title
        </Grid.Column>
	<Grid.Column>
		Issue Description
	</Grid.Column>
        </Grid.Row>

        
          {this.state.assigned.map(el => (
            <Grid.Row>
	<Grid.Column>
              {el.id}
	</Grid.Column>
	<Grid.Column>
	{el.heading} 
	</Grid.Column>
	<Grid.Column>
	{el.description}
	</Grid.Column>

        </Grid.Row>
          ))}
        </Grid>
        
	


	<Button as={Link} to={{pathname:"/projects" , state:{userId:this.props.location.state.userId , typeofuser:this.props.location.state.typeofuser} }} >View All Projects</Button>


	<Button style={style} as={Link} to={{pathname:"/about" , state:{userId:this.props.location.state.userId , typeofuser:this.props.location.state.typeofuser} }} >View All Users</Button>
	
	</div>
	
	);

}
}

export default Mypage;

