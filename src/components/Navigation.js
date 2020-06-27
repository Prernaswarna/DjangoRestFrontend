import React from 'react';
 
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {
    return (
       <div style={{textAlign:'right'}}>
          <NavLink to="/logout">Logout</NavLink>
       </div>
    );
}
 
export default Navigation;
