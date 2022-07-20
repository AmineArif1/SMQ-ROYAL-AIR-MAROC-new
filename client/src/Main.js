import { Redirect,useNavigate } from "react-router-dom"

import {useEffect, useState,createContext} from 'react'
import Header from './Header'
import Axios from 'axios';
import Img from './img/folder.png'
import { useHistory } from "react-router-dom";

export default function Main(props){
   
    let history=useHistory();

    let [row,setRow]=useState([]);
    let [inputproc,setInputproc]=useState('')
    let [tempo,setTempo]=useState(true)
    let [id,setId]=useState(null)
    let [parentid,setParentid]=useState([null])
    let [yikes,setYikes]=useState([])
    let [yik,setYik]=useState([])
    function addproc(id){
        
        console.log(id)
        if(id==null){
            Axios.post('http://localhost:3002/api/addproc',{
                
              "processus":inputproc,
              "id":id

        }).then((response)=>{
            if(!response.data.message){
               
                
                
                Axios.get("http://localhost:3002/api/getproc",{  }).then((response)=>{setRow(response.data)})   
                 
               
        }
       
           
        })
        }
        else{
            Axios.post('http://localhost:3002/api/addproc',{
                
              "processus":inputproc,
              "id":id

        }).then((response)=>{
            if(!response.data.message){
               
                
                
                Axios.post("http://localhost:3002/api/getprocdos",{ "id":id }).then((response)=>{setRow(response.data)})
                 
               
        }
       
           
        })
        }
    }
    function back(){
        console.log(yikes.splice(yikes.length - 1)) 

        Axios.post("http://localhost:3002/api/getprocdos",{ "id":yikes[yikes.length - 1] }).then((response)=>{setRow(response.data)})
        setYikes(yikes.splice(yikes.length - 1))
                 
    }
    function handleClickDelete(event,idtodelete){
        if(id==null){
            Axios.post("http://localhost:3002/api/procdelete",{"id":idtodelete}).then(()=>{
                
                Axios.get("http://localhost:3002/api/getproc",{  }).then((response)=>{setRow(response.data)})   
                 
               
        }
            
           
        )}
        else{
        Axios.post("http://localhost:3002/api/procdelete",{"id":idtodelete}).then(()=>{
            Axios.post("http://localhost:3002/api/getprocdos",{ "id":id }).then((response)=>{setRow(response.data)})

        })}}
    function tofichier(currentid,parentidd){
    
   setYikes([parentidd,...yikes])
   

    setId(yikes[0])
   
    Axios.post("http://localhost:3002/api/getprocdos",{ "id":currentid,"parentid":parentidd }).then((response)=>{setRow(response.data)})
    //    
   }
        
    
   

    useEffect(() => {
        
        Axios.get("http://localhost:3002/api/getproc",{  }).then((response)=>{setRow(response.data)})
          
       
        //Runs on every render
      },[]);
    return( 
    <>
    <Header/>

    <div className="main--container">
    {row.map((temp)=> (<div className="contain--img stop"> <img src={Img} width="30px"></img>   <div className="pad" onClick={()=>(tofichier(temp.id_processus,temp.id_doss))} >{temp.libellé}</div> <button type="button" className="users--button" onClick={event => handleClickDelete(event, temp.id_processus)}>Supprimer</button></div>))}
   

    </div>
    <div className="center--form">
    <h3>libellé</h3>
    <input type="text" onChange={(e)=>{setInputproc(e.target.value)}}></input>
    <button type="button" onClick={()=>addproc(id)} className="auth--submit">Confirmer</button>
    </div>
    {/* <button onClick="addproc" className="auth--submit centerbutton">Ajouter un processus</button> */}
    <div onClick={back} class="arrow-left"></div>
    </>)
 }