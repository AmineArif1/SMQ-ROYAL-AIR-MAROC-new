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
    let [idd,setIdd]=useState(null)
    let [yikes,setYikes]=useState([])
    let [hist,setHist]=useState([])
    let [source,setSource]=useState(["://"])
    const [isLoading, setIsLoading] = useState(false);

    
    function addproc(id){
         setIsLoading(true);
    
        if(id==null){
            Axios.post('http://localhost:3002/api/addproc',{
                
              "processus":inputproc,
              "id":id,
              answer:window.token
             

        }).then((response)=>{
            if(!response.data.message){
               
                
                
                Axios.get("http://localhost:3002/api/getproc",{ params:{answer:window.token} }).then((response)=>{ setIsLoading(false);setRow(response.data)})   
                 
               
        }
       
           
        })
        }
        else{
            Axios.post('http://localhost:3002/api/addproc',{
                
              "processus":inputproc,
              "id":id,
              answer:window.token

        }).then((response)=>{
            if(!response.data.message){
               
                
                setIsLoading(false);
                Axios.post("http://localhost:3002/api/getprocdos",{ "id":id,"answer":window.token }).then((response)=>{setRow(response.data)})
                 
               
        }
       
           
        })
        }
    }
    function back(){
        setIsLoading(true);

        Axios.post("http://localhost:3002/api/getprocdos",{ "id":hist[hist.length - 1],answer:window.token})
        .then((response)=>{setIdd(hist[hist.length-1]);setSource(source.slice(0,-2));setHist(hist.slice(0, -1)); setIsLoading(false);;setRow(response.data)})

        
     
        
  
     
       
     
     

                 
    }
    function handleClickDelete(event,idtodelete){
        setIsLoading(true);
        if(idd==null){
            Axios.post("http://localhost:3002/api/procdelete",{"id":idtodelete,answer:window.token}).then(()=>{
                
                Axios.get("http://localhost:3002/api/getproc",{ params:{answer:window.token} }).then((response)=>{ setIsLoading(false);setRow(response.data)})   
                 
               
        }
            
           
        )}
        else{
        Axios.post("http://localhost:3002/api/procdelete",{"id":idtodelete,answer:window.token}).then(()=>{
            Axios.post("http://localhost:3002/api/getprocdos",{ "id":idd, answer:window.token}).then((response)=>{ setIsLoading(false);setRow(response.data)})

        })}}
    function tofichier(currentid,x){
    setIsLoading(true);
    setIdd(currentid)
    Axios.post("http://localhost:3002/api/getlibelle",{ "id":currentid,answer:window.token}).then((response)=>{setSource([...source,response.data[0].libellé,' / '])})
    setHist([...hist,x]);
    Axios.post("http://localhost:3002/api/getprocdos",{ "id":currentid,"parentid":x,answer:window.token}).then((response)=>{ setIsLoading(false);setRow(response.data)})
    //    
   }
   function sendusers(){
    history.push('/Users');
   }

   useEffect(()=>{console.log(hist)},[hist])
   useEffect(()=>{console.log(idd)},[idd])
   useEffect(()=>{console.log(source)},[source])

   

    useEffect(() => {
        setIsLoading(true);
        Axios.get("http://localhost:3002/api/getproc",{params:{answer:window.token}  }).then((response)=>{ setIsLoading(false);setRow(response.data)})
          
       
        //Runs on every render
      },[]);
      if(!props.authorized){
        return <Redirect to="/"/>
    }
  
    return( 
    <>
    <Header/>
        <button onClick={sendusers} className="send--users">users</button>
     
    <div className="main--container">
    {row.map((temp)=> (<div className="contain--img stop"> <img src={Img} width="30px"></img>   <div className="pad" onClick={()=>(tofichier(temp.id_processus,temp.id_doss))} >{temp.libellé}</div> <button type="button" className="users--button" onClick={event => handleClickDelete(event, temp.id_processus)}>Supprimer</button></div>))}
   

    </div>
    <div className="center--form">
    <h3>libellé</h3>
    <input type="text" onChange={(e)=>{setInputproc(e.target.value)}}></input>
    <button type="button" onClick={()=>addproc(idd)} className="auth--submit">Confirmer</button>
    </div>
    {/* <button onClick="addproc" className="auth--submit centerbutton">Ajouter un processus</button> */}
    <div onClick={back} class="arrow-left"></div>
    {isLoading &&
   <>
   <div className="graybackground"></div>
   <div class="loader">
    
     
      <div class="plane">
        <img src="https://zupimages.net/up/19/34/4820.gif" class="plane-img"></img>
      </div>
      <div class="earth-wrapper">
        <div class="earth"></div>
      </div>  

    </div>
    
    </>     }
  <p>
  <h4 className="source">{source} </h4>

  </p>
  
    </>)
 }