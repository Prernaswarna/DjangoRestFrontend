import React from 'react';
import {Button,Divider , Grid , Header , Segment , Label} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
 
const home = () => {
     return(
        <div style={{backgroundImage:'linear-gradient(rgb(255,255,255) , rgb(118,118,255)' , height:'100vh', width:'100%'}}>
	     <br />
	     <br />
	     <br />
	     <br />
        <div style={{backgroundColor:'#0000b1' ,border:'1px solid #0000b1' , borderRadius:'30px',margin:'auto' , height:'50vh' , width:'60%'}}>
                <br /><br /><h2 style={{textAlign:'center' , color:'white'}}>Welcome to Bug Fix App</h2>       
	     <h3 style={{textAlign:'center' , color:'#DCDCDC'}}>Please Login to proceed</h3>
        <br />
        <br />
        <div style={{textAlign:'center',margin:'auto' , width:'50%' }}>


        <a href="https://internet.channeli.in/oauth/authorise/?client_id=Z0D8JmQtXjXJxp63bsnt2HEGvWuw7sSRD19oZ4FO&redirect_url=http://127.0.0.1:3000/omniport&state=reachedpage" style={{ display:'inlineBlock' , backgroundColor:'#d8d8ff',boder:'1px solid #d8d8ff' , borderRadius:'4px' , color:'black' , padding:'14px 25px' , textAlign:'center' , textDecoration:'none' }}>Login with Omniport</a>
        </div>
	 </div>
        </div>
        );

}
 
export default home;
