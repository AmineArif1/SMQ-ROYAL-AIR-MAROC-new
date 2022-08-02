import { useNavigate } from "react-router-dom";
import {useState,useEffect,React} from 'react';
import { useHistory } from "react-router-dom";
import Axios from 'axios';

let authorized=false;
function Auth(){

    let history=useHistory();
    let [username,setUsername]=useState('');
    let [password,setPassword]=useState('');
    let [inputval,setInputval]=useState([]);
    let [response,setResponse]=useState('');
    let [screen,setScreen]=useState([
        <div className="container">,
        <img className="logo" src='https://upload.wikimedia.org/wikipedia/commons/b/bf/Logo_Royal_Air_Maroc.svg'></img>
        <input className="auth--input" type="text" onChange={(e)=>{setUsername(e.target.value)}}></input>
        <input className="auth--input" type="text" onChange={(e)=>{setPassword(e.target.value)}}></input>
        <button className="auth--submit" onClick={submit} >Confirmer</button>,
        <h1>{response}</h1>,
    </div>]
    )
    

function submit(){

Axios.post('http://localhost:3002/api/login',{
        "username":username,
        "password":password
}).then((response)=>{
    if(!response.data.message){
    
    authorized=true;
    // statut here
    Axios.post('http://localhost:3002/api/statut',{"id":response.data.result[0].id,"answer":response.data.token}).then((response1)=>{

        if(response1.data[0].statut=='2'){
            history.push('/Admin')
        }
        else{
            history.push(`/Main/${response.data.result[0].id}`);
        }
    })

    window.token= response.data.token;

   
    }
    else{
        setResponse((re)=>
        response.data.message);
    }
})
    }
   
    return(

        <div className="container">,
        <img className="logo" src='https://upload.wikimedia.org/wikipedia/commons/b/bf/Logo_Royal_Air_Maroc.svg'></img>
        <input className="auth--input" type="text" onChange={(e)=>{setUsername(e.target.value)}}></input>
        <input className="auth--input" type="text" onChange={(e)=>{setPassword(e.target.value)}}></input>
        <button className="auth--submit" onClick={submit} >Confirmer</button>,
        <h1>{response}</h1>,
     
    </div>
       
      
    )
}
export {Auth,authorized}
