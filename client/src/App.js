
import './App.css';
import {Auth,authorized} from './Auth'
import Main from './Main'
import Fichier from './Fichier'
import Admin from './Admin'
import {BrowserRouter as Router, Route,Switch} from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';

import {ToastContainer} from 'react-toastify';
import Form from './Formulaires/form'
import './Formulaires/form.css'

function App() {
  console.log(<Main/>)
  
  return (

   <Router>
    <Switch>
 
      <Route exact path="/" component={Auth}/>
      <Route exact path="/Main/:userid" component={()=><Main authorized={authorized}/>}/>
      <Route exact path="/fichier/:id" component={()=><Fichier authorized={authorized}/>}/>
      <Route exact path="/Admin/" component={()=><Admin authorized={authorized}/>}/>
      <Route exact path="/Carted'identité/:userid" component={()=><Form well = {"ci"}/>}/>
      <Route exact path="/CRRevuedeProcessus/:userid" component={()=><Form well = {"rp"}/>}/>
    </Switch>
   </Router>
  );
}

export default App;
