import React from 'react';
import axios from 'axios';
 
function Contact()
{
	return(
	<div >
	<br />
	<br />
		<h2 style={{textAlign:'center'}}>Welcome to Bug Fix App</h2>       <h2 style={{textAlign:'center'}}>Please Login to proceed</h2>
	<br />
	<br />
	<div style={{textAlign:'center',margin:'auto' , width:'50%' }}>
	
		
	<a href="https://internet.channeli.in/oauth/authorise/?client_id=Z0D8JmQtXjXJxp63bsnt2HEGvWuw7sSRD19oZ4FO&redirect_url=http://127.0.0.1:3000/omniport&state=reachedpage" style={{ display:'inlineBlock' , backgroundColor:'#696969' , color:'white' , padding:'14px 25px' , textAlign:'center' , textDecoration:'none' }}>Login through omniport</a>
	</div>
	</div>
	)
}
 
export default Contact;
