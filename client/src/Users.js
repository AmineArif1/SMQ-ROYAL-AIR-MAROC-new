import {useEffect, useState} from 'react'
import Header from './Header'
import Axios from 'axios';
import {  useParams,useHistory,Redirect } from "react-router-dom";

export default function Users(props){
    let history=useHistory();
    let [row,setRow]=useState([]);
    let [username,setUsername]=useState('');
    let [password,setPassword]=useState('');
    let [nom,setNom]=useState('');
    let [prenom,setPrenom]=useState('');
    let [token,setToken]=useState('');
    let [processus,setProcessus]=useState('');
    const [isLoading, setIsLoading] = useState(false);
    let {id}=useParams();
    let [buttonAdd,setbuttonAdd]=useState(true)
    
    function submit(){
       
    
        Axios.post('http://localhost:3002/api/addUser',{
                
                "username":username,
                "password":password,
                "nom":nom,
                "prenom":prenom,
                "processus":processus,
                answer:window.token

        }).then((response)=>{
            if(!response.data.message){
               
              
                
                Axios.get("http://localhost:3002/api/get",{ params: { answer: window.token } }).then((response)=>{
                setIsLoading(false);    
                setRow(response.data)})
                 
               
        }
       
           
        })
    }

    
    const handleClickDelete = (event, param) => {
        setIsLoading(true);
        Axios.post("http://localhost:3002/api/delete",{"id":param,answer:window.token}).then(()=>{
            Axios.get("http://localhost:3002/api/get",{ params: { answer: window.token } }).then((response)=>{
                setIsLoading(false);
                
                setRow(response.data)}) 
        })
       
      };
      const handleClickUpdate= (event, param,stat) => {
        setIsLoading(true);
        if(!stat)
        Axios.post("http://localhost:3002/api/Yadmin",{"id":param,answer:window.token}).then(()=>{
            Axios.get("http://localhost:3002/api/get",{ params: { answer: window.token } }).then((response)=>{
                setIsLoading(false);
                setRow(response.data)}) 
        })
        
        else Axios.post("http://localhost:3002/api/Nadmin",{"id":param,answer:window.token}).then(()=>{
            Axios.get("http://localhost:3002/api/get",{ params: { answer: window.token } }).then((response)=>{
                setIsLoading(false);
                setRow(response.data)}) 
        })
       
      };
    function sendmain(){
      history.push(`/Main/${id}`);
    }
    // const interval1 = setInterval(handleClickDelete,50);
    // const interval2 = setInterval(handleClickUpdate,50);
    //   useEffect(() => {
    //     return () => {
    //         clearInterval(interval1)
    //         clearInterval(interval2)
    //     }
    //   }, [])
    
    

    // elarifamine1@gmail.com
    useEffect(() => {
        
        Axios.get("http://localhost:3002/api/get",{ params: { answer: window.token } }).then((response)=>setRow(response.data))    
        //Runs on every render
      },[]);

  
  
    let idrow=row.map((res)=>{
        
        return(
            
            <tr >
            
            <th>{res.nom}</th>
            <th>{res.prenom}</th>
            <th>{res.email}</th>
            <th>{res.password}</th>
            <th><button className="users--button" onClick={event => handleClickUpdate(event, res.id,res.statut)}>{res.statut ? "admin" : "pas admin"}</button></th>
            <th><button className="users--button" onClick={event => handleClickDelete(event, res.id)}>Supprimer</button></th>
            </tr>
        )
    })
    
    return (
    <>
    <Header/>
   
    
    <table className="user--table   ">
    <tbody>
        <tr>
            
            <th>NOM</th>
            <th>PRENOM</th>
            <th>EMAIL</th>
            <th>PASSWORD</th>
            <th>ADMIN</th>
            <th>DELETE</th>
        </tr>
       {idrow}

       <tr>
        
        
       </tr>
    </tbody>
  
    </table>
    
    {buttonAdd ? <button className="auth--submit centerbutton" onClick={event=>setbuttonAdd(!buttonAdd)} >ajouter un utilisateur</button> : <>
    <div className="graybackground"></div>
       <div className="add--users">
       <div className="ktab" >Email :</div><input className="add--input " type="text" onChange={(e)=>{setUsername(e.target.value)}}></input>
       <div className="ktab">Password : </div>  <input className="add--input" type="text" onChange={(e)=>{setPassword(e.target.value)}}></input>
       <div className="ktab">Nom :</div><input className="add--input" type="text" onChange={(e)=>{setNom(e.target.value)}}></input>
       <span className="ktab">Prenom :</span> <input className="add--input" type="text" onChange={(e)=>{setPrenom(e.target.value)}}></input>
       <span className="ktab">Processus :</span> <input className="add--input" type="text" onChange={(e)=>{setProcessus(e.target.value)}}></input>
           <button className="auth--submit center--button" onClick={submit} >Confirmer</button>,

           
   </div> </>}
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
    <span onClick={sendmain} class="material-symbols-outlined send--users">
home
</span>
    </> 
    )
}