
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
      {/* ModèleReglesdeMaîtrisedesDocumentsExterne/72 */}
      <Route exact path="/ModèleReglesdeMaîtrisedesDocumentsExterne/:userid" component={()=><Form well = {"MDE"}/>}/>
      {/* ModèleReglesdeMaîtrisedesDocumentsInternes/74 */}
      <Route exact path="/ModèleReglesdeMaîtrisedesDocumentsInternes/:userid" component={()=><Form well = {"MDI"}/>}/>
      {/* MaîtrisedesInformationsDocumentées/75 */}
      <Route exact path="/MaîtrisedesInformationsDocumentées/:userid" component={()=><Form well = {"MID"}/>}/>
      {/* SurveillanceetGestiondesNC */}
      <Route exact path="/SurveillanceetGestiondesNC/:userid" component={()=><Form well = {"SGN"}/>}/>



    </Switch>
   </Router>
  );
}

export default App;
