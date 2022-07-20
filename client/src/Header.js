import {useState} from 'react'
import { useHistory } from "react-router-dom";
import Img from './img/logo.jpg'
export default function Header(){
    let history=useHistory();
    function click(){
        console.log("okey?")
        history.push('/')
        
    }
    
    return (
        <div className='chose--container'>
            <img className='chose--logo' src={Img}></img>
            <div className='top-sinta'>
            
            </div>
            <button className='logout' onClick={click}>logout</button>
           
        </div>
        

    )
}
        