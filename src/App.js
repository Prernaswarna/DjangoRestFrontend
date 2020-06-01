import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading"
    };
  }

   componentDidMount() {
    axios
     .get("https://internet.channeli.in/oauth/authorise/?client_id=Z0D8JmQtXjXJxp63bsnt2HEGvWuw7sSRD19oZ4FO&redirect_url=http://127.0.0.1:8000/user/confirm&state=reachedpage")
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      
      .then(data => {
        this.setState(() => {
          return {
            data,
            loaded: true
          };
        });
      });
  }


  render() {
    return (
        this.state.data
    );
  }
}


export default App;
