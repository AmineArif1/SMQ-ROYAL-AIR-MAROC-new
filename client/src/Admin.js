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

    useEffect(()=>{axios.get('http://localhost:3002/api/processusget').then((response)=>{setRow(response.data)})},[])
    let idrow=row.map((res)=>{
        
        return(
            
            <tr >
            
            <th>{res.id_proc}</th>
            <th>{res.titre}</th>
            <th>{res.Description}</th>
            <th>{res.id_user}</th>
            <th><span class="material-symbols-outlined">person</span> <span class="material-symbols-outlined">
more_vert
</span></th>
           
            </tr>
        )
    })
    return (
        <>
     <div className="sidebar">
        <img src={logo} width="220px"></img>
            <ul className="sidebar--list">
            <div className={barvar1 ? "flexo scale" : "flexo"} onClick={()=>{setBarvar1(true);setBarvar2(false)}}>   <div className={barvar1 ? "bef":""}></div><li>
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
                  
                    
         
            <span class="material-symbols-outlined plus">
add_circle
</span>
        </table>}
        
        </>
    )

}