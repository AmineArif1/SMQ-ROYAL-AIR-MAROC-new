import { useParams,Redirect,useNavigate } from "react-router-dom"

import {useEffect, useState,createContext} from 'react'
import Header from './Header'
import Axios from 'axios';
import Imgdoss from './img/folder.png'
import Imgfile from './img/file.png'
import { useHistory } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

export default function Main(props){
   
    let history=useHistory();

    let [row,setRow]=useState([]);
    let [inputproc,setInputproc]=useState('')
    let [tempo,setTempo]=useState(true)
    let [idd,setIdd]=useState(null)
    let [yikes,setYikes]=useState([])
    let [hist,setHist]=useState([])
    let [source,setSource]=useState([""])
    const [isLoading, setIsLoading] = useState(false);
    let [file,setFile]=useState(null)
    let [fichierow,setFichierow]=useState([])
    let [fileid,setFileid]=useState([])
    let [transfolder,setTransfolder]=useState(false)
    let [transfile,setTransfile]=useState(false)
    let {userid}=useParams();
    let [userproc,setUserproc]=useState()
    let [isadmin,setIsadmin]=useState();
    let [boolfich,setBoolFich]=useState(false)
    let [entrance,setEntrance]=useState()

    function addproc(id){
         setIsLoading(true);
    
        if(id==null){
            Axios.post('http://localhost:3002/api/addproc',{
                
              "processus":inputproc,
              "id":id,
              answer:window.token
             

        }).then((response)=>{
            if(!response.data.message){
               
                
                
                Axios.get("http://localhost:3002/api/getproc",{ params:{answer:window.token} }).then((response)=>{setTransfolder(false); setIsLoading(false);setRow(response.data)})   
                 
               
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
                Axios.post("http://localhost:3002/api/getprocdos",{ "id":id,"answer":window.token }).then((response)=>{setTransfolder(false);setRow(response.data)})
                 
               
        }
       
           
        })
        }
    }
    function back(){
        setIsLoading(true);
        axios.post("http://localhost:3002/api/getfile",{id:idd}).then((response)=>{setFichierow(response.data)})  
        Axios.post("http://localhost:3002/api/getprocdos",{ "id":hist[hist.length - 1],answer:window.token})
        .then((response)=>{setIdd(hist[hist.length-1]);setSource(source.slice(0,-2));setHist(hist.slice(0, -1)); setIsLoading(false);;setRow(response.data)})
        
     
            console.log(userproc)
            console.log(entrance)
         
            setBoolFich(false)
        
        
     
        
  
     
       
     
     

                 
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
    axios.post("http://localhost:3002/api/getfile",{id:idd}).then((response)=>{setFichierow(response.data)})     
   }
   function handleClickDeleteFile(event,idtodelete){
    // setIsLoading(true);
   
    Axios.post("http://localhost:3002/api/filedelete",{"id":idtodelete,answer:window.token}).then(()=>{
        axios.post("http://localhost:3002/api/getfile",{id:idd}).then((response)=>{setFichierow(response.data)}) 

    })}



   function sendusers(){
    history.push(`/Users/${userid}`);
   }

   useEffect(()=>{console.log(hist)},[hist])
   useEffect(()=>{condition()},[idd])
   useEffect(()=>{console.log(source)},[source])
   useEffect(()=>{console.log('ROCK AND ROLL')},[userproc])
    useEffect(() => {
        setIsLoading(true);
        Axios.get("http://localhost:3002/api/getproc",{params:{answer:window.token}  }).then((response)=>{ setIsLoading(false);setRow(response.data)})
        axios.get('http://localhost:3002/api/userproc',{params:{userid:userid}}).then((response)=>{setUserproc(response.data[0].id_processus)})
        axios.get('http://localhost:3002/api/isadmin',{params:{userid:userid}}).then((response)=>{response.data[0].statut==0 ? setIsadmin(false) : setIsadmin(true)})
       
        //Runs on every render
      },[]);
      useEffect(() => {
        axios.post("http://localhost:3002/api/getfile",{id:idd}).then((response)=>{setFichierow(response.data)})  
      },[idd])
      useEffect(()=>{console.log(userproc)},[userproc])
      
      if(!props.authorized){
        return <Redirect to="/"/>
    }
  
    function onInputChange(e){
        setFile(e.target.files[0])
    }
   const onSubmit=(e)=>{    
      
        e.preventDefault();
        const data =new FormData();
        data.append('file',file)
       data.append('id',idd)
        axios.post('http://localhost:3002/api/upload',data).then((e)=>{
            toast.success('Envoie terminé');
            axios.post("http://localhost:3002/api/getfile",{id:idd}).then((response)=>{setTransfile(false);setFichierow(response.data)})
        })
        .catch((e)=>{
              toast.error('Echec');
            console.error('Error',e)
        })
    }
    const condition = ()=>{
    if(idd!=null && idd==userproc){
        setEntrance(idd)
        setBoolFich(true)
        
    }}
    console.log(userproc+"ajahahahahahaahhaahh")
    let temp=idd!=null && idd==userproc;
    var today  = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    function download(name){
        window.open(`http://localhost:3002/api/download?filename=${name}`, '_blank');
        axios.get('http://localhost:3002/api/download',{params:{filename:name}}).then(()=>{})
    }
    function transition(){
        setTransfolder(true)
    }
    return( 
        <>
    <Header/>
    <h4 className="source">{source} </h4>
  {isadmin &&  <span onClick={sendusers} class="material-symbols-outlined send--users point">
manage_accounts
</span>}
   
     
    <div className="main--container">

   <div className="flexcenter1"><div>{(boolfich || (idd!=null && isadmin==true) )   &&<span class="material-symbols-outlined two" onClick={transition}>create_new_folder</span>}{(boolfich || (idd!=null && isadmin==true) ) && <span onClick={()=>setTransfile(true)} class="material-symbols-outlined two">
file_upload
</span>}</div>
<h3 className="time"> {today.toLocaleDateString("fr-FR", options)}</h3>
</div> 

    {row.map((temp)=> (<div className="aligncenter stop"> <img src={Imgdoss} width="30px"></img>   <div className="lol pad" onClick={()=>(tofichier(temp.id_processus,temp.id_doss))} >{temp.libellé}</div>{(boolfich || (idd!=null && isadmin==true) )    && <><div  onClick={event => handleClickDelete(event, temp.id_processus)}><span class="material-symbols-outlined point icon">
delete
</span></div></>}</div>))}
    {fichierow.map((temp)=>(( <div className="aligncenter stop topbottompad"> <img src={Imgfile} width="30px"></img>  <div className="lol pad">{temp.libellé.substring(temp.libellé.indexOf("-")+1)}</div><div className="flexcenter"><div onClick={()=>(download(temp.libellé))} class="material-symbols-outlined point this1">
download
</div>{(boolfich || (idd!=null && isadmin==true) )   && <><div  onClick={event => handleClickDeleteFile(event, temp.id_fichier)}><span class="material-symbols-outlined point this2">
delete
</span></div></>}</div></div>)))}

    </div>
  
    {/* <button onClick="addproc" className="auth--submit centerbutton">Ajouter un processus</button> */}
 
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

{transfile &&
<>

    <div className="graybackground"></div>
    <span onClick={()=>setTransfile(false)} class="material-symbols-outlined quit">
cancel
</span>
    <div class="col-md-6">
        
<form method="post" action="#" id="#" onSubmit={onSubmit}> 
<div class="form-group files">
       <input class="form-control" type="file" onChange={onInputChange} multiple="" required/> 
       <button >submit </button>
 </div>
</form>
</div></>}
<span onClick={back} className="arrow">&#10229;</span>

{transfolder && <>
<div className="graybackground"></div>
<span onClick={()=>setTransfolder(false)} class="material-symbols-outlined quit1">
cancel
</span>
 <div className="center--form">
 <h3 className="lib">libellé</h3>
 <input className="auth--input" type="text" onChange={(e)=>{setInputproc(e.target.value)}}></input>
 <button type="button" onClick={()=>addproc(idd)} className="auth--submit point">Confirmer</button>
 </div></>}
    </>)
 }