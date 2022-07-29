import { useParams,Redirect,useHistory,useLocation } from "react-router-dom"
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
    let [visib,setVisib]=useState(false)
    

    useEffect(()=>{axios.get('http://localhost:3002/api/processusget').then((response)=>{setRow(response.data)});
    axios.get("http://localhost:3002/api/getoption",{ params: {answer: window.token } }).then((response)=>{

        setPilote(response.data[0].id)
        setOption(response.data)})
}
    ,[])

    let idrow=row.map((res)=>{
    let x

    
        return(
            
            <tr  >
            
           <td> <div className="smol"> {res.id_proc}</div></td>
           <td> <div className="smol"> {res.titre}</div></td>
             <td styleName="overflow"><div className="smol">{res.Description}</div></td>
           
          <td><div className="smol">{res.nom+" "+res.prenom}</div></td>

            <td><span class="material-symbols-outlined point point" onClick={()=>{handleClickDelete(res.id_proc,res.titre)}}>delete</span> <span onClick={()=>{
                setThreepoint(true);setBarvar1(false)
                axios.get('http://localhost:3002/api/processusgettemp',{params:{"id_proc":res.id_proc}}).then((response)=>{
                    setProc(response.data[0].id_proc)
                    setTitre(response.data[0].titre)
                    setDesc(response.data[0].Description)
                    setPilote(response.data[0].id_user)
            })
                }} class="material-symbols-outlined point">
more_vert
</span></td>
           
            </tr>
        )
    })

    let options=option.map((variable)=>{
       return <option value={variable.id}>{variable.nom+' '+variable.prenom}</option>
    })


    function submitproc(){


        axios.post("http://localhost:3002/api/addprocessus",{
            "id_proc":proc,
            "titre":titre,
            "desc":desc,
            "pilote":pilote
            // /api/addprocname
        }).then((response)=>{axios.post('http://localhost:3002/api/addprocroot',{"processus":proc+" - "+titre}).then((response)=>{
            axios.post('http://localhost:3002/api/addprocname',{"id":response.data[0].id_processus})  ;
        })  ;


        


        axios.get('http://localhost:3002/api/processusget').then((response)=>{setRow(response.data);});})
    }
    
    function submitproc2(){
        axios.post("http://localhost:3002/api/modifyprocessus",{
            "id_proc":proc,
            "titre":titre,
            "desc":desc,
            "pilote":pilote
        }).then((response)=>{console.log(response);axios.get('http://localhost:3002/api/processusget').then((response)=>{setRow(response.data);})})
    }
    const handleClickDelete = (param,added) => {

        axios.post("http://localhost:3002/api/processusdelete",{"id_proc":param}).then(()=>{
            axios.post("http://localhost:3002/api/procdelete",{"id": param+' - '+added})
            axios.get("http://localhost:3002/api/processusget",).then((response)=>{
              
                
                setRow(response.data)}) 
        })
       
      };
    //   users part
    let history=useHistory();
    let [row1,setrow1]=useState([]);
    let [username,setUsername]=useState('');
    let [password,setPassword]=useState('');
    let [nom,setNom]=useState('');
    let [prenom,setPrenom]=useState('');
    let [token,setToken]=useState('');
    let [processus,setProcessus]=useState('');
    const [isLoading, setIsLoading] = useState(false);
    let [statut,setStatu]=useState(1);
    let {id}=useParams();
    let [buttonAdd,setbuttonAdd]=useState(true)
    let [threepoint2,setThreepoint2]=useState(false)
    let [dataid,setDataid]=useState();
    
    function submit(){
       
    
        axios.post('http://localhost:3002/api/addUser',{
                
                "username":username,
                "password":password,
                "nom":nom,
                "prenom":prenom,
                "statut":statut,
                answer:window.token

        }).then((response)=>{
            if(!response.data.message){
               
                axios.get("http://localhost:3002/api/getoption",{ params: {answer: window.token } }).then((response)=>{
       
        
                    setOption(response.data)})
                
                axios.get("http://localhost:3002/api/get",{ params: { answer: window.token } }).then((response)=>{
                setIsLoading(false);    
                setbuttonAdd(true)
                setrow1(response.data)})
                 
               
        }
       
           
        })
    }
    function submit2(id){
       console.log(id)
    
        axios.post('http://localhost:3002/api/modifyUser',{
                "id":id,
                "username":username,
                "password":password,
                "nom":nom,
                "prenom":prenom,
                "statut":statut,
           

        }).then((response)=>{
            
               
            axios.get("http://localhost:3002/api/getoption",{ params: {answer: window.token } }).then((response)=>{
       
        
                setOption(response.data)})
                
                axios.get("http://localhost:3002/api/get",{ params: { answer: window.token } }).then((response)=>{
                setIsLoading(false);    
                setbuttonAdd(true)
                setrow1(response.data)})
                 
               
        
       
           
        })
    }

    
    const handleClickDelete111 = (event, param) => {
        setIsLoading(true);
        axios.post("http://localhost:3002/api/delete",{"id":param,answer:window.token}).then(()=>{
            axios.get("http://localhost:3002/api/getoption",{ params: {answer: window.token } }).then((response)=>{
       
        
                setOption(response.data)})
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
            
            <td>{res.nom}</td>
            <td>{res.prenom}</td>
            <td>{res.email}</td>
            <td onClick={()=>setVisib(!visib)}>{!visib ? <span class="material-symbols-outlined point">
visibility
</span> : res.password}</td>
           {res.statut=="0" && <td>Consultant</td>}
           {res.statut=="1" && <td>Pilote</td>}
           {res.statut=="2" && <td>Admin</td>}
            <td><span className="material-symbols-outlined point" onClick={event => handleClickDelete111(event, res.id)}>delete</span><span className="material-symbols-outlined point" onClick={event => {
                setThreepoint2(true);setBarvar2(false);
                axios.get("http://localhost:3002/api/getrow",{ params:{"id":res.id} }).then((response)=>{
                    setDataid(response.data[0].id)
                    setNom(response.data[0].nom)
                    setPrenom(response.data[0].prenom)
                    setUsername(response.data[0].email)
                    setPassword(response.data[0].password)
                    setStatu(response.data[0].statut)
                })

            }}>more_vert</span></td>
            
            </tr>
        )
    })
    
    return (

        <>
     <div className="sidebar">
        <img src={logo} width="220px"></img>
            <ul className="sidebar--list">
            <div className={barvar1 || pop || threepoint  ? "flexo scale point" : "flexo point"} onClick={()=>{setBarvar1(true);setThreepoint2(false);setbuttonAdd(true);setBarvar2(false)}}>   <div className={barvar1 || pop || threepoint ? "bef":""}></div><li>
                    Processus
                </li></div>
                <div onClick={()=>{setBarvar2(true);setThreepoint(false);setPop(false);setBarvar1(false)}} className={barvar2 ? "flexo scale point" : "flexo point"}>   <div className={barvar2 ? "bef":""}></div><li>
                    Utilisateur
                </li></div>
            </ul>
        </div>
      {barvar1  &&<table className="tableproc" border="0px">
            <thead>
            <tr>
                <td>Processus</td>
                <td>Titre</td>
                <td >Description</td>
                <td>Pilote</td>
                
            </tr>
            </thead>
          
            {idrow}
                  
                    
         
            <span class="material-symbols-outlined point plus point"  onClick={()=>{setPop(true);setBarvar1(false)}}>
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
<button className="button1" onClick={()=>{submitproc();setPop(false);setBarvar1(true)}}>Enregistrer</button>
<button className="button2" onClick={()=>{setPop(false);setBarvar1(true)}} >Annuler</button>

</div>
<h1 className="title">Ajouter Process</h1>
         
           <span  class="material-symbols-outlined point quit4 point" onClick={()=>{setPop(false);setBarvar1(true)}}>
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
<button className="button1" onClick={()=>{submitproc2();setThreepoint(false);setBarvar1(true)}}>Enregistrer</button>
<button className="button2" onClick={()=>{setThreepoint(false);setBarvar1(true)}} >Annuler</button>

</div>
<h1 className="title">Modifier Processus</h1>
         
           <span  class="material-symbols-outlined point quit4 point" onClick={()=>{setThreepoint(false);setBarvar1(true)}}>
cancel
</span>
</>}     

{barvar2 && <> 
    <table className="user--table">
    <tbody>
        <tr>
            
            <td>NOM</td>
            <td>PRENOM</td>
            <td>EMAIL</td>
            <td>PASSWORD</td>
            <td>PROFILE</td>
            
        </tr>
       {idrow1}

       <span class="material-symbols-outlined point add point"  onClick={()=>{setBarvar2(true);setbuttonAdd(false);setBarvar2(false)}}>
add_circle
</span>
    </tbody>


    </table>
 
   
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
 

    
    </>    } 
    {!buttonAdd && <>
    
       <div className="add-proc">
       <h1 className="title1">Ajouter Utilisateur </h1> 
       <div className="flex" > <div className="temp-left">Nom :</div><input className="temp-right" type="text" onChange={(e)=>{setNom(e.target.value)}}></input></div>
       <div className="flex" > <span className="temp-left">Prenom :</span> <input className="temp-right" type="text" onChange={(e)=>{setPrenom(e.target.value)}}></input></div>
       <div className="flex" ><div className="temp-left" >Email :</div><input className="temp-right " type="text" onChange={(e)=>{setUsername(e.target.value)}}></input></div>
       <div className="flex" > <div className="temp-left">Password : </div>  <input className="temp-right" type="text" onChange={(e)=>{setPassword(e.target.value)}}></input></div>
   
       {/* <span className="ktab">Processus :</span> <input className="add--input" type="text" onChange={(e)=>{setProcessus(e.target.value)}}></input> */}
       <div className="flex">  <span className="temp-left">Profile:</span> 
       <select value={statut} className="temp-right"  onChange={(e)=>{setStatu(e.target.value);console.log(e.target.value)}}>

<option value="1">pilote</option>
<option value="2">Admin</option>
<option value="0">Consultant</option>

</select>

</div>

           <button className="auth--submit center--button" onClick={()=>{submit();setbuttonAdd(true);setBarvar2(true)}} >Confirmer</button>
           <span onClick={()=>{setbuttonAdd(true);setBarvar2(true)}} class="material-symbols-outlined point quit3 point">
           
cancel
</span>
<button className="button22" onClick={()=>{setbuttonAdd(true);setBarvar2(true)}} >Annuler</button>
{/* {pop &&   <> <div className="add-proc" >
      <div className="flex"><div className="temp-left" >Processus :</div><input className="temp-right" type="text" onChange={(e)=>{setProc(e.target.value)}}></input></div>
      <div className="flex">  <div className="temp-left">Titre:</div>  <input className="temp-right" type="text" onChange={(e)=>{setTitre(e.target.value)}}></input></div>
      <div className="flex">    <div className="temp-left">Description :</div><textarea className="temp-right"  onChange={(e)=>{setDesc(e.target.value)}}></textarea></div>
      <div className="flex">  <span className="temp-left">Pilote:</span> 
  <select className="temp-right"  onChange={(e)=>{setPilote(e.target.value);console.log(e.target.value)}}>

{options}
</select>
            */}
   </div> </>}
   
   {threepoint2 && <>
    
    <div className="add-proc">
    <h1 className="title1">Modifier Utilisateur </h1> 
    <div className="flex" ><div className="temp-left" >Email :</div><input value={username} className="temp-right " type="text" onChange={(e)=>{setUsername(e.target.value)}}></input></div>
    <div className="flex" > <div className="temp-left">Password : </div>  <input value={password} className="temp-right" type="text" onChange={(e)=>{setPassword(e.target.value)}}></input></div>
    <div className="flex" > <div className="temp-left">Nom :</div><input value={nom} className="temp-right" type="text" onChange={(e)=>{setNom(e.target.value)}}></input></div>
    <div className="flex" > <span className="temp-left">Prenom :</span> <input value={prenom} className="temp-right" type="text" onChange={(e)=>{setPrenom(e.target.value)}}></input></div>
    
    {/* <span className="ktab">Processus"
    :</span> <input className="add--input" 
    type="text" onChange={(e)=>{setProcessus
    sssssssss(e.target.value)}}></input> */}

    <div className="flex">  <span className="temp-left">Profile:</span> 
    <select value={statut} className="temp-right"  onChange={(e)=>{setStatu(e.target.value);console.log(e.target.value)}}>

<option value="1">pilote</option>
<option value="2">Admin</option>
<option value="0">Consultant</option>

</select>

</div>

        <button className="auth--submit center--button" onClick={()=>{submit2(dataid);setThreepoint2(false);setBarvar2(true)}} >Confirmer</button>
        <span onClick={()=>{setThreepoint2(false);setBarvar2(true)}} class="material-symbols-outlined point quit3 point">
        
cancel
</span>
<button className="button22" onClick={()=>{setThreepoint2(false);setBarvar2(true)}} >Annuler</button>

</div> </>}
   
        </>

    )

}