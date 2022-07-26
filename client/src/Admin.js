import { useParams,Redirect,useLocation } from "react-router-dom"
import {useEffect, useState} from 'react'
import Header from './Header'
import axios from 'axios';
import Img from './img/file.png'
import logo from './img/translogo.png'

export default function Admin(props){
    let [barvar1,setBarvar1]=useState(false)
    let [barvar2,setBarvar2]=useState(false)
    let [row,setRow]=useState([])
    let [proc,setProc]=useState();
    let [titre,setTitre]=useState();
    let [desc,setDesc]=useState();
    let [pilote,setPilote]=useState();
    let [pop,setPop]=useState(false);
    let [temp,setTemp]=useState()
    let [threepoint,setThreepoint]=useState(false);
    let [option,setOption]=useState([])
    let [resid,setResid]=useState()
    

    useEffect(()=>{axios.get('http://localhost:3002/api/processusget').then((response)=>{setRow(response.data)});
    axios.get("http://localhost:3002/api/get",{ params: { answer: window.token } }).then((response)=>{
       
        
        setOption(response.data)})
}
    ,[])

    let idrow=row.map((res)=>{
    let x

    
        return(
            
            <tr >
            
            <th>{res.id_proc}</th>
            <th>{res.titre}</th>
            <th>{res.Description}</th>
           
           <th>{res.nom+" "+res.prenom}</th>

            <th><span class="material-symbols-outlined point" onClick={()=>{handleClickDelete(res.id_proc)}}>delete</span> <span onClick={()=>{
                setThreepoint(true);setBarvar1(false)
                axios.get('http://localhost:3002/api/processusgettemp',{params:{"id_proc":res.id_proc}}).then((response)=>{
                    setProc(response.data[0].id_proc)
                    setTitre(response.data[0].titre)
                    setDesc(response.data[0].Description)
                    setPilote(response.data[0].id_user)
            })
                }} class="material-symbols-outlined">
more_vert
</span></th>
           
            </tr>
        )
    })

    let options=option.map((variable)=>{
       return <option value={variable.id}>{variable.nom+' '+variable.prenom}</option>
    })


    function submit(){
        axios.post("http://localhost:3002/api/addprocessus",{
            "id_proc":proc,
            "titre":titre,
            "desc":desc,
            "pilote":pilote
        }).then((response)=>{console.log(response);axios.get('http://localhost:3002/api/processusget').then((response)=>{setRow(response.data);})})
    }
    
    function submit2(){
        axios.post("http://localhost:3002/api/modifyprocessus",{
            "id_proc":proc,
            "titre":titre,
            "desc":desc,
            "pilote":pilote
        }).then((response)=>{console.log(response);axios.get('http://localhost:3002/api/processusget').then((response)=>{setRow(response.data);})})
    }
    const handleClickDelete = (param) => {

        axios.post("http://localhost:3002/api/processusdelete",{"id_proc":param}).then(()=>{
            axios.get("http://localhost:3002/api/processusget",).then((response)=>{
              
                
                setRow(response.data)}) 
        })
       
      };
    return (
        <>
     <div className="sidebar">
        <img src={logo} width="220px"></img>
            <ul className="sidebar--list">
            <div className={barvar1 || pop || threepoint  ? "flexo scale" : "flexo"} onClick={()=>{setBarvar1(true);setBarvar2(false)}}>   <div className={barvar1 || pop || threepoint ? "bef":""}></div><li>
                    Processus
                </li></div>
                <div onClick={()=>{setBarvar2(true);setBarvar1(false)}} className={barvar2 ? "flexo scale" : "flexo"}>   <div className={barvar2 ? "bef":""}></div><li>
                    Utilisateur
                </li></div>
            </ul>
        </div>
      {barvar1  &&<table className="tableproc" border="0px">
            <thead>
            <tr>
                <th>Processus</th>
                <th>Titre</th>
                <th>Description</th>
                <th>Pilote</th>
                
            </tr>
            </thead>
          
            {idrow}
                  
                    
         
            <span class="material-symbols-outlined plus point"  onClick={()=>{setPop(true);setBarvar1(false)}}>
add_circle
</span>
        </table>}

   {pop &&   <> <div className="add-proc" >
      <div className="flex"><div className="temp-left" >Processus :</div><input className="temp-right" type="text" onChange={(e)=>{setProc(e.target.value)}}></input></div>
      <div className="flex">  <div className="temp-left">Titre:</div>  <input className="temp-right" type="text" onChange={(e)=>{setTitre(e.target.value)}}></input></div>
      <div className="flex">    <div className="temp-left">Description :</div><textarea className="temp-right"  onChange={(e)=>{setDesc(e.target.value)}}></textarea></div>
      <div className="flex">  <span className="temp-left">Pilote:</span> 
  <select className="temp-right"  onChange={(e)=>{setPilote(e.target.value);console.log(e.target.value)}}>

{options}
</select>
</div>  
<button className="button1" onClick={()=>{submit();setPop(false);setBarvar1(true)}}>Enregistrer</button>
<button className="button2" onClick={()=>{setPop(false);setBarvar1(true)}} >Annuler</button>

</div>
<h1 className="title">Ajouter Process</h1>
         
           <span  class="material-symbols-outlined quit4 point" onClick={()=>{setPop(false);setBarvar1(true)}}>
cancel
</span>
</>}
{threepoint &&   <> <div className="add-proc" >
      {/* <div className="flex"><div className="temp-left" >Processus :</div><input value={proc} className="temp-right" type="text" onChange={(e)=>{setProc(e.target.value)}}></input></div> */}
      <div className="flex">  <div className="temp-left">Titre:</div>  <input value={titre} className="temp-right" type="text" onChange={(e)=>{setTitre(e.target.value)}}></input></div>
      <div className="flex">    <div className="temp-left">Description :</div><textarea value={desc} className="temp-right"  onChange={(e)=>{setDesc(e.target.value)}}></textarea></div>
      <div className="flex">  <span className="temp-left">Pilote:</span> 
  <select value={pilote} className="temp-right"  onChange={(e)=>{setPilote(e.target.value);console.log(e.target.value)}}>

{options}
</select>
</div>  
<button className="button1" onClick={()=>{submit2();setThreepoint(false);setBarvar1(true)}}>Enregistrer</button>
<button className="button2" onClick={()=>{setThreepoint(false);setBarvar1(true)}} >Annuler</button>

</div>
<h1 className="title">Modifier Processus</h1>
         
           <span  class="material-symbols-outlined quit4 point" onClick={()=>{setThreepoint(false);setBarvar1(true)}}>
cancel
</span>
</>}     

        
        </>
    )

}