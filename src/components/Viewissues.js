import React , {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {Header ,Button,Segment , Label, Grid} from 'semantic-ui-react';



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
        const response = await axios({url:'http://127.0.0.1:8000/bug/',method:'GET' , withCredentials:true}).then(response=>{return response}).catch(error=>{window.location.href="http://127.0.0.1:3000/fail"})
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
	const res = await axios({url:'http://127.0.0.1:8000/user/currentuser', method:'get' , withCredentials:true}).then(response=>{return response}).catch(error=>{window.location.href="http://127.0.0.1:3000/fail"})

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
	<div style={{padding:'2% 10% 2% 10%' , textAlign:'center'}}><Header as='h2'>
     <Header.Content>
      Issue List
      <Header.Subheader>View all issues for project {this.props.location.state.projectname} </Header.Subheader>
    </Header.Content>
  </Header></div>

      <div style={{padding:'2% 10% 2% 10%'}}>
        <Grid columns={1} style={s1} >
          {this.state.arr.map(el => (
            <Grid.Row>
	    <Grid.Column>
		 <Segment raised>
                        <Label as='a' color='pink' ribbon>
                        Issue Id : {el.id}
                        </Label>
		    
		  <Link to={{
                      pathname : "/individualissue",
                      state :{issueId:  el.id ,projectNumber:this.props.location.state.projectNumber , projectNames:this.props.location.state.projectname}
                }} >

		  {el.heading} : 
		 </Link>
		  <span style={{backgroundColor:'#ff99aa' ,color:'white', padding:'2px', margin:'2%' , border:'2px solid #ff99aa' , borderRadius:'4px'}}>{el.statusval}</span>
		 </Segment>
	     </Grid.Column>
	
        </Grid.Row>
          ))}
        </Grid>
        <div style={{textAlign:'center', padding:'5%'}}><Button color='black' as={Link} to={{pathname:"/reportbug" , state:{projectNumber:projectId} }} >Add Issue</Button></div>

      </div>
</div>
    );

}
}

export default Viewissues;



