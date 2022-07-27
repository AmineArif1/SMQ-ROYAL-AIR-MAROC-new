import {useEffect, useState} from 'react'
import Header from './Header'
import axios from 'axios';
import {  useParams,useHistory,Redirect } from "react-router-dom";

export default function Users(props){
    let history=useHistory();
    let [row1,setrow1]=useState([]);
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
       
    
        axios.post('http://localhost:3002/api/addUser',{
                
                "username":username,
                "password":password,
                "nom":nom,
                "prenom":prenom,
                "processus":processus,
                answer:window.token

        }).then((response)=>{
            if(!response.data.message){
               
              
                
                axios.get("http://localhost:3002/api/get",{ params: { answer: window.token } }).then((response)=>{
                setIsLoading(false);    
                setbuttonAdd(true)
                setrow1(response.data)})
                 
               
        }
       
           
        })
    }

    
    const handleClickDelete111 = (event, param) => {
        setIsLoading(true);
        axios.post("http://localhost:3002/api/delete",{"id":param,answer:window.token}).then(()=>{
            axios.get("http://localhost:3002/api/get",{ params: { answer: window.token } }).then((response)=>{
                setIsLoading(false);
                
                setrow1(response.data)}) 
        })
       
      };
      const handleClickUpdate= (event, param,stat) => {
        setIsLoading(true);
        if(!stat)
        axios.post("http://localhost:3002/api/Yadmin",{"id":param,answer:window.token}).then(()=>{
            axios.get("http://localhost:3002/api/get",{ params: { answer: window.token } }).then((response)=>{
                setIsLoading(false);
                setrow1(response.data)}) 
        })
        
        else axios.post("http://localhost:3002/api/Nadmin",{"id":param,answer:window.token}).then(()=>{
            axios.get("http://localhost:3002/api/get",{ params: { answer: window.token } }).then((response)=>{
                setIsLoading(false);
                setrow1(response.data)}) 
        })
       
      };
    function sendmain(){
      history.push(`/Main/${id}`);
    }
    // const interval1 = setInterval(handleClickDelete111,50);
    // const interval2 = setInterval(handleClickUpdate,50);
    //   useEffect(() => {
    //     return () => {
    //         clearInterval(interval1)
    //         clearInterval(interval2)
    //     }
    //   }, [])
    
    

    // elarifamine1@gmail.com
    useEffect(() => {
        
        axios.get("http://localhost:3002/api/get",{ params: { answer: window.token } }).then((response)=>setrow1(response.data))    
        //Runs on every render
      },[]);

  
  
    let idrow1=row1.map((res)=>{
        
        return(
            
            <tr >
            
            <th>{res.nom}</th>
            <th>{res.prenom}</th>
            <th>{res.email}</th>
            <th>{res.password}</th>
            <th><button className="users--button" onClick={event => handleClickUpdate(event, res.id,res.statut)}>{res.statut ? "admin" : "pas admin"}</button></th>
            <th><button className="users--button" onClick={event => handleClickDelete111(event, res.id)}>Supprimer</button></th>
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
       {idrow1}

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
           <button className="auth--submit center--button" onClick={submit} >Confirmer</button>
           <span onClick={()=>setbuttonAdd(true)} class="material-symbols-outlined quit3 point">
cancel
</span>

           
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
    <span onClick={sendmain} class="material-symbols-outlined send--users point">
home
</span>

    </> 
    )
}