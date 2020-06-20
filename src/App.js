import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
 
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Error from './components/Error';
import Navigation from './components/Navigation';
import Projects from './components/Projects';
import Individual from './components/Individual';
import Reportbug from './components/Reportbug';
import Omniport from './components/Omniport';
import Newproject from './components/Newproject';
import Editproject from './components/Editproject';
import Viewissues from './components/Viewissues';
import Individualissue from './components/Individualissue';
import Editissue from './components/Editissue';
import Mypage from './components/Mypage';
import Done from './components/Done';


class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
          <Navigation />
            <Switch>
             <Route path="/" component={Home} exact/>
             <Route path="/about" component={About}/>
             <Route path="/contact" component={Contact}/>
	    <Route path = "/projects" component={Projects}/>
	    <Route path="/individual" component={Individual}/>
	    <Route path="/reportbug" component={Reportbug} />
	    <Route path="/omniport" component={Omniport} />
	    <Route path="/newproject" component={Newproject} />
	    <Route path="/editproject" component={Editproject} />
	    <Route path="/viewissues" component={Viewissues} />
	    <Route path="/individualissue" component={Individualissue} />
	    <Route path="/editissue" component={Editissue} />
	    <Route path="/mypage" component={Mypage} />
	    <Route path="/done" component={Done} />
            <Route component={Error}/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;
