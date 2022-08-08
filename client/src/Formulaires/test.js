import axios from 'axios'
import { useState,React, useEffect } from 'react'
import logo from 'F:\\RAM PROJECT\\SMQ-ROYAL-AIR-MAROC-new\\client\\src\\img\\logo.jpg'


function Test(){
  var [page , setPage] = useState([]);
  var [data, setData]=useState({});
  var [half, setHalf] = useState([]);
  
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
  function textarea(){
    axios.post("http://localhost:3002/api/addtextarea").then(
      axios.get("http://localhost:3002/api/getpage").then((response)=>{
        setPage(response.data)
      })
    )
  }
  function input(){
    axios.post("http://localhost:3002/api/addinput").then(
      axios.get("http://localhost:3002/api/getpage").then((response)=>{
        setPage(response.data)
      })
    )
  }
  function semizonetext(){
    axios.post("http://localhost:3002/api/addsemiinput").then(
      axios.get("http://localhost:3002/api/getpage").then((response)=>{
        setPage(response.data)
      })
    )
  }
  function table(){
    let rowum = prompt("row number")
    let colum = prompt("collumn number")

  }
  useEffect(()=>{
    // copy paste this to apply changes without manual reload :)
    axios.get("http://localhost:3002/api/getpage").then((response)=>{
      setPage(response.data)
      
    })
  },[])
  let bool = true;
  var inpage = page.map((temp,index)=>{

    if(temp.type==="input"){
     

      data[index]=temp.contenue
      return (<div className='flextext1'><input onChange={(e)=>data[index]=e.target.value}  className='label' type="text" defaultValue={temp.contenue}></input>
    <span onClick={()=>todone(temp.idelement,index)} className="material-symbols-outlined point">done</span> <span onClick={()=>todelete(temp.idelement)} class="material-symbols-outlined point">close</span></div>)

    }

    if(temp.type === "halfinput"){
      data[index] = temp.contenue
      // (()=>{setHalf(...half,1)})
      return (<span className={bool ? 'flextext half' : 'flextext nass'}><textarea onChange={(e)=>data[index]=e.target.value}  className='labelarea' type="text" defaultValue={temp.contenue}></textarea>
      
      {bool = !bool}
      <span onClick={()=>todone(temp.idelement,index)} className="material-symbols-outlined point">done</span> <span onClick={()=>todelete(temp.idelement)} class="material-symbols-outlined point">close</span></span>)
    }
    
    if(temp.type==="textarea"){

      data[index]=temp.contenue
      return (<div className='flextext big'><textarea  onChange={(e)=>data[index]=e.target.value}  className='textarea' defaultValue={temp.contenue}></textarea>
          <span  onClick={()=>todone(temp.idelement,index)} className="material-symbols-outlined point">done</span> <span onClick={()=>todelete(temp.idelement)} class="material-symbols-outlined point">close</span></div>)
    }
    
    



  })
 
  return (
    <>
   
    <ul class="sidebar1 fixed">
      <img src={logo} width="230px"></img>
      <li onClick={input}><a href="#">Libellé</a></li>
      <li onClick={textarea}><a href="#">Zone de text</a></li>
      <li onClick={semizonetext}><a href="#">1/2 Zone de text</a></li>
      <li onClick={table}><a href="#">Table</a></li>
      </ul>
    {inpage}
    
      
    </>
    )
      
      }
    

export default Test