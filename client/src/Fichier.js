import { useParams,Redirect,useLocation } from "react-router-dom"
import {useEffect, useState} from 'react'
import Header from './Header'
import Axios from 'axios';
import Img from './img/file.png'

export default function Fichier(props){
   
    let [row,setRow]=useState([]);
    let {id}=useParams();
   
    useEffect(() => {
        Axios.post("http://localhost:3002/api/fichiers",{ "id":id }).then((response)=>{setRow(response.data)})    
        //Runs on every render
      },[]);
    
      return (
 <>
 <Header />
 <div className="main--container">
    {row.map((temp)=> (<div className="contain--img stop"> <img src={Img} width="30px"></img>   <div className="pad" >{temp.libellé}</div> </div>))}
 </div>
 {/* <button className="users--button" onClick={event => handleClickDelete(event, temp.id_processus)}>Supprimer</button> */}
 
 {/* <input type="file" name="filetoupload"></input> */}
 </>
      )

}