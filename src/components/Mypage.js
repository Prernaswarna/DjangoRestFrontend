import React , {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {Button,Divider , Grid , Header , Segment , Label} from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';



class Mypage extends Component
{
        constructor(props)
        {
                super(props);
                this.state = { typeofuser:false , userId:0 ,projects :[], assigned:[] ,reported:[], projectlist:[] , issueslist:[] , isDisplayed:false , failed:false};
        }
async componentDidMount()
{
	//console.log(this.props.location.state.typeofuser);
	const jsonuser = await axios({url:'http://127.0.0.1:8000/user/currentuser', method:'get' , withCredentials:true}).then(response=>{return response.data}).catch(error=>{this.setState({failed:true})})

        if(jsonuser!=undefined)
	{
        	this.setState({typeofuser:jsonuser.typeofuser})
        	this.setState({userId:jsonuser.userId});
	}
        const json = await axios({url:'http://127.0.0.1:8000/project/',method:'GET' , withCredentials:true}).then(response=>{return response.data}).catch(error=>{this.setState({failed:true})})
 
	const js = await axios({url:'http://127.0.0.1:8000/bug/',method:'GET' , withCredentials:true}).then(response=>{return response.data}).catch(error=>{this.setState({failed:true}) })
        if(js!=undefined && json!=undefined)
	{
        	await this.setState({projectlist:json});
		await this.setState({issueslist:js});
  		let Newarr= [];
        	for(let proj in this.state.projectlist)
        	{
			for(let user in this.state.projectlist[proj]["project_members"])
			{
                		if(this.state.projectlist[proj]["project_members"][user]  == this.state.userId)
                		{
                        		Newarr.push(this.state.projectlist[proj])

                		}
			}
        	}
         	await this.setState({projects:Newarr});




		let newarr= [];
        	for(let bug in this.state.issueslist)
        	{
                	if(this.state.issueslist[bug]["reporter"]  == this.state.userId)
                	{
                        	newarr.push(this.state.issueslist[bug])

                	} 
        	}
         	await this.setState({reported:newarr});


		let arr= [];
        	for(let bug in this.state.issueslist)
        	{
                	if(this.state.issueslist[bug]["assignee"]  == this.state.userId)
                	{
                        	arr.push(this.state.issueslist[bug])
                	}

        	}
         	await this.setState({assigned:arr});

		if(this.state.typeofuser==true)
			await this.setState({isDisplayed:true})
	}
	/*console.log(this.state.issueslist);
	console.log(this.state.projectlist);
	console.log(this.state.projects);
	console.log(this.state.assigned);
	console.log(this.state.reported);
	console.log(this.props.location.state.userId);
	console.log(this.props.location.state.typeofuser);*/
	
}
renderRedirect= () =>{
        if(this.state.failed==true)
        {
                return <Redirect to={{pathname:'/fail'  }}/>
        }
}


render()
{
	const style = this.state.isDisplayed ? {display:''} : {display:'none'}
	const s1 = this.state.projects && this.state.projects.length>0 ? {display:''}:{display:'none'}
	const s2 = this.state.assigned && this.state.assigned.length>0 ? {display:''} : {display:'none'}
	const s3 = this.state.reported && this.state.reported.length>0 ? {display:''} : {display:'none'}
	
        return (<div>
		<div style={{padding:'2% 10% 2% 10%'}}><Header as='h2'>
      {this.renderRedirect()}
	<Header.Content>
      My Account
      <Header.Subheader>Important projects and issues</Header.Subheader>
    </Header.Content>
  </Header></div>
		<Divider />
		<div style={{padding:'2% 10% 2% 10%'}}>
		<Header as='h3' style={s1}>My Projects</Header>
        <Grid style={s1} columns={1}>

          {this.state.projects.map(el => (
            <Grid.Row>
	    <Grid.Column>
              <Segment raised>
                        <Label as='a' color='pink' ribbon>
                        Project Number:{el.id}
                        </Label>
	   	{el.project_name}
		  
		 </Segment>
	    </Grid.Column>
            </Grid.Row>
       
          ))}
        </Grid>
</div>	
<Divider />	
	<div style={{padding:'2% 10% 2% 10%'}}>
	<Header as='h3' style={s3}>Reported Issues</Header>
	<Grid style={s3} columns={1} >
        
          {this.state.reported.map(el => (
            <Grid.Row>
	<Grid.Column>
		  <Segment raised>
                        <Label as='a' color='yellow' ribbon>
                        Issue Id : {el.id}
                        </Label>

	 {el.heading} : <span style={{color:'#808080'}}>{el.description}</span>
	</Segment>
		  </Grid.Column>

	</Grid.Row>
          ))}
        </Grid>
       </div> 


<Divider />
	<div style={{padding:'2% 10% 2% 10%'}}>
	<Header style={s2} as='h3'>Assigned Issues</Header>
	<Grid style={s2} columns={1} >
        
          {this.state.assigned.map(el => (
            <Grid.Row>
	<Grid.Column>
              <Segment raised>
                        <Label as='a' color='pink' ribbon>
                        Issue Id : {el.id}
                        </Label>
	{el.heading} : <span style={{color:'#808080'}}>{el.description}</span>
	</Segment>
		 </Grid.Column>

        </Grid.Row>
          ))}
        </Grid>
       </div> 
	
	<Divider />

	<div style={{textAlign:'center', padding:'5%'}}><Button color='blue' as={Link} to={{pathname:"/projects" }} >View All Projects</Button>


	<Button color='green' style={style} as={Link} to={{pathname:"/about"  }} >View All Users</Button></div>
	
	</div>
	
	);

}
}

export default Mypage;

