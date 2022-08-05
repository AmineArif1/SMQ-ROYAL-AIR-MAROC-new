import axios from 'axios'
import { useState,React, useEffect } from 'react'



function Test(){
  var [page , setPage] = useState([]);
  var [data, setData]=useState({});
  function todone(temp,e){
    
    axios.post("http://localhost:3002/api/updateelement",{"id":temp,"data":data[e]}).then(
      axios.get("http://localhost:3002/api/getpage").then((response)=>{
        setPage(response.data)
      })
    );

  }
  function todelete(temp){
    axios.post("http://localhost:3002/api/deleteelement",{"id":temp}).then(
      axios.get("http://localhost:3002/api/getpage").then((response)=>{
        setPage(response.data)
      })
    );
  }

  useEffect(()=>{
    // copy paste this to apply changes without manual reload :)
    axios.get("http://localhost:3002/api/getpage").then((response)=>{
      setPage(response.data)
    })
  },[])
  var inpage = page.map((temp,index)=>{
    if(temp.type==="input"){
      data[index]=temp.contenue
      return (<div className='flextext'><input onChange={(e)=>data[index]=e.target.value}  className='label' type="text" defaultValue={temp.contenue}></input>
    <span onClick={()=>todone(temp.idelement,index)} className="material-symbols-outlined">done</span> <span onClick={()=>todelete(temp.idelement)} class="material-symbols-outlined">close</span></div>)

    }
    
    if(temp.type==="textarea"){
      data[index]=temp.contenue
      return (<div className='flextext'><textarea onChange={(e)=>data[index]=e.target.value}  className='textarea' defaultValue={temp.contenue}></textarea>
          <span  onClick={()=>todone(temp.idelement,index)} className="material-symbols-outlined">done</span> <span onClick={()=>todelete(temp.idelement)} class="material-symbols-outlined">close</span></div>)
    }
    
    



  })
 
  return (
    <>
    {inpage}
    </>
    )
      
      }
    

export default Test