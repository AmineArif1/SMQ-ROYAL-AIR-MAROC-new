
import './App.css';
import {Auth,authorized} from './Auth'
import Users from './Users'
import Main from './Main'
import Fichier from './Fichier'
import {BrowserRouter as Router, Route,Switch} from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';

function App() {
  return (

   <Router>
    <Switch>
 
      <Route exact path="/" component={Auth}/>
      <Route exact path="/Users" component={()=><Users authorized={authorized}/>}/>
      <Route exact path="/Main/" component={()=><Main authorized={authorized}/>}/>
      <Route exact path="/fichier/:id" component={()=><Fichier authorized={authorized}/>}/>
    </Switch>
   </Router>
  );
}

export default App;
