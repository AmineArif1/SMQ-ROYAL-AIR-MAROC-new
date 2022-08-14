import axios from 'axios'
import { useState, React, useEffect } from 'react'
import logo from 'F:\\RAM PROJECT\\SMQ-ROYAL-AIR-MAROC-new\\client\\src\\img\\logo.jpg'
import { useHistory, useParams} from "react-router-dom";

function Test() {
  var [page, setPage] = useState([]);
  var [data, setData] = useState({});
  var [half, setHalf] = useState([]);
  let [performance, setPerformace] = useState([]);
  let [tablo, setTablo] = useState([]);
  let [deletor, setDeletor] = useState([])
  let [nom, setNom] = useState();
  let [def, setDef] = useState();
  let [form, setForm] = useState();
  let [Responsable, setResponsable] = useState();
  let [period, setPeriod] = useState();
  let [threepoint, setThreepoint] = useState();
  let counter = 0;
  let { userid } = useParams();
  console.log(userid)
  let history = useHistory();

 function okrow(){
  console.log('been hit')
  axios.post("http://localhost:3002/api/insertfirstable",{"nom": nom , "def" : def , "form": form , "Responsable" : Responsable , "period" : period , answer : window.token}).then((response) => {
    axios.get("http://localhost:3002/api/getperformance").then((response) => {setThreepoint(false); setTablo(response.data); setPerformace(response.data) })
     
  })
 }
  useEffect(() => {
    console.log(userid)
    axios.get("http://localhost:3002/api/getpage",{params:{id:userid}}).then((response) => {

      setPage(response.data)
    })
  }, [deletor])
  function todone(temp, e) {

    axios.post("http://localhost:3002/api/updateelement", { "id": temp, "data": data[e] }).then(
      axios.get("http://localhost:3002/api/getpage",{params:{id:userid}}).then((response) => {

        setPage(response.data)
      })
    );

  }
  function todelete(temp) {
    axios.get("http://localhost:3002/api/deleteelement", { params: { "id": temp } }).then(
      axios.get("http://localhost:3002/api/getpage",{params:{id:userid}}).then((response) => {

        setPage(response.data)
      })

    );
  }
  function textarea() {
    axios.post("http://localhost:3002/api/addtextarea").then(
      axios.get("http://localhost:3002/api/getpage",{params:{id:userid}}).then((response) => {

      setPage(response.data)
    })
    )
  }
  function input() {
    axios.post("http://localhost:3002/api/addinput").then(
      axios.get("http://localhost:3002/api/getpage",{params:{id:userid}}).then((response) => {

        setPage(response.data)
      })
    )
  }
  function semizonetext() {
    axios.post("http://localhost:3002/api/addsemiinput").then(
      axios.get("http://localhost:3002/api/getpage",{params:{id:userid}}).then((response) => {

        setPage(response.data)
      })
    )
  }
  function semilibellé() {
    axios.post("http://localhost:3002/api/addsemilibelle").then(
      axios.get("http://localhost:3002/api/getpage",{params:{id:userid}}).then((response) => {

        setPage(response.data)
      }))
  }
  function thirdzonetext() {
    axios.post("http://localhost:3002/api/addthirdinput").then(
      axios.get("http://localhost:3002/api/getpage",{params:{id:userid}}).then((response) => {

        setPage(response.data)
      })
    )
  }
  function thirdzonelibellé() {
    axios.post("http://localhost:3002/api/thirdzonelib").then(
      axios.get("http://localhost:3002/api/getpage",{params:{id:userid}}).then((response) => {

        setPage(response.data)
      })
    )
  }
  function table() {
    axios.post("http://localhost:3002/api/addtable").then(
      axios.get("http://localhost:3002/api/getpage",{params:{id:userid}}).then((response) => {

        setPage(response.data)
      })
    )


  }

  useEffect(() => {
    // copy paste this to apply changes without manual reload :)
    axios.get("http://localhost:3002/api/getpage",{params:{id:userid}}).then((response) => {

   
    
      setPage(response.data);
      axios.get("http://localhost:3002/api/getperformance").then((response) => { setTablo(response.data); setPerformace(response.data) })


    })
  }, [])
  function rowok(index) {
    axios.post("http://localhost:3002/api/updaterow", { 'data': tablo[index] }).then(
      axios.get("http://localhost:3002/api/getperformance").then((response) => { setTablo(response.data); setPerformace(response.data) })
    )
  }
  function rowdelete(index) {
    axios.post("http://localhost:3002/api/deleterow", { 'data': tablo[index].idIndi_Performance }).then(
      axios.get("http://localhost:3002/api/getperformance").then((response) => {setThreepoint(false); setTablo(response.data); setPerformace(response.data) })


    )
  }
  var per = performance.map((lol, index) => {
  
    return (
      <tr>
        <td>
          <textarea onChange={(e) => tablo[index].Nom_indicateur = e.target.value} defaultValue={lol.Nom_indicateur}></textarea>
        </td>
        <td>
          <textarea onChange={(e) => tablo[index].Definition = e.target.value} defaultValue={lol.Definition}></textarea>
        </td>
        <td>
          <textarea onChange={(e) => tablo[index].Formule = e.target.value} defaultValue={lol.Formule}></textarea>

        </td>
        <td>
          <textarea onChange={(e) => tablo[index].Responsable_maj = e.target.value} defaultValue={lol.Responsable_maj}></textarea>


        </td>
        <td>
          <textarea onChange={(e) => tablo[index].Periodicite = e.target.value} defaultValue={lol.Periodicite}></textarea>


        </td>
        <td>
          <span onClick={() => rowok(index)} className="material-symbols-outlined point">done</span>
          <span onClick={() => rowdelete(index)} class="material-symbols-outlined point">close</span>

        </td>
      </tr>)
  })
  console.log(tablo)
  let bool = true;
  let bool1 = true;
  var inpage = page.map((temp, index) => {

    if (temp.type === "input") {


      data[index] = temp.contenue
      return (<div className='flextext1'><input onChange={(e) => data[index] = e.target.value} className='label' type="text" defaultValue={temp.contenue}></input>
        <span onClick={() => todone(temp.idelement, index)} className="material-symbols-outlined point">done</span> <span onClick={() => todelete(temp.idelement)} class="material-symbols-outlined point">close</span></div>)

    }
    if (temp.type === "halflib") {
      data[index] = temp.contenue
      // (()=>{setHalf(...half,1)})
      return (<span className={bool ? 'flextext1 half1' : 'flextext nass'}><input onChange={(e) => data[index] = e.target.value} className='label' type="text" defaultValue={temp.contenue}></input>

        {bool = !bool}
        <span onClick={() => todone(temp.idelement, index)} className="material-symbols-outlined point">done</span> <span onClick={() => todelete(temp.idelement)} class="material-symbols-outlined point">close</span></span>)
    }

    if (temp.type === "halfinput") {
      data[index] = temp.contenue
      // (()=>{setHalf(...half,1)})
      return (<span className={bool ? 'flextext half' : 'flextext nass'}><textarea onChange={(e) => data[index] = e.target.value} className='labelarea' type="text" defaultValue={temp.contenue}></textarea>

        {bool = !bool}
        <span onClick={() => todone(temp.idelement, index)} className="material-symbols-outlined point">done</span> <span onClick={() => todelete(temp.idelement)} class="material-symbols-outlined point">close</span></span>)
    }
    if (temp.type === "thirdlib") {

      data[index] = temp.contenue
      if (counter > 2) { counter = 0; bool1 = true }
      counter += 1;
      // (()=>{setHalf(...half,1)})
      return (<span className={bool1 ? `flextext1 libthird${counter}` : 'flextext nass'}><input onChange={(e) => data[index] = e.target.value} className='label' type="text" defaultValue={temp.contenue}></input>

        {counter == 2 ? (bool1 = !bool1) : (bool1 = bool1)}

        {console.log(counter)}


        <span onClick={() => todone(temp.idelement, index)} className="material-symbols-outlined point">done</span> <span onClick={() => todelete(temp.idelement)} class="material-symbols-outlined point">close</span></span>)
    }
    if (temp.type === "thirdinput") {

      data[index] = temp.contenue
      if (counter > 2) { counter = 0; bool1 = true }
      counter += 1;
      // (()=>{setHalf(...half,1)})
      return (<span className={bool1 ? `flextext halfthird${counter}` : 'flextext nass'}><textarea onChange={(e) => data[index] = e.target.value} className='labelarea' type="text" defaultValue={temp.contenue}></textarea>

        {counter == 2 ? (bool1 = !bool1) : (bool1 = bool1)}

        {console.log(counter)}


        <span onClick={() => todone(temp.idelement, index)} className="material-symbols-outlined point">done</span> <span onClick={() => todelete(temp.idelement)} class="material-symbols-outlined point">close</span></span>)
    }

    if (temp.type === "textarea") {

      data[index] = temp.contenue
      return <div className='flextext big'><textarea onChange={(e) => data[index] = e.target.value} className='textarea' defaultValue={temp.contenue}></textarea>
        <span onClick={() => todone(temp.idelement, index)} className="material-symbols-outlined point">done</span> <span onClick={() => todelete(temp.idelement)} class="material-symbols-outlined point">close</span>
      </div>


    }

    if (temp.type === 'table') {
      return (
        <table className='table-left' >
          <tbody>
            <tr>
              <th>Nom Indicateur</th>
              <th>Définition</th>
              <th>Formule</th>
              <th>Résponsable Mise à Jour</th>
              <th>Périodicité</th>
              <th><span onClick={() => todelete(temp.idelement)} className="material-symbols-outlined point outred">close</span></th>
            </tr>


            {per}
            {threepoint && <tr>
              <td><textarea  type="text" onChange={(e) => { setNom(e.target.value) }}></textarea></td>
              <td><textarea  onChange={(e) => { setDef(e.target.value) }}></textarea></td>
              <td><textarea  onChange={(e) => { setForm(e.target.value) }}></textarea> </td>
              <td><textarea  onChange={(e) => { setResponsable(e.target.value) }}></textarea></td>
              <td> <textarea  onChange={(e) => { setPeriod(e.target.value) }}></textarea></td>
              <td>
              <span onClick={okrow} className="material-symbols-outlined point">done</span>
              <span onClick={()=>setThreepoint(false)} className="material-symbols-outlined point">close</span>
              </td>

              
              </tr>}

          </tbody>
          <button onClick={() => setThreepoint(true)}>Add</button>
        </table>
      )


    }





  })

  return (
    <>

      <ul class="sidebar1 fixed">
        <img src={logo} width="230px"></img>
        <li onClick={input}><a href="#">Libellé</a></li>
        <li onClick={semilibellé}><a href="#">1/2 Libellé</a></li>
        <li onClick={thirdzonelibellé}><a href="#">1/3 Libellé</a></li>
        <li onClick={textarea}><a href="#">Zone de text</a></li>
        <li onClick={semizonetext}><a href="#">1/2 Zone de text</a></li>
        <li onClick={thirdzonetext}><a href="#">1/3 Zone de text</a></li>
        <li onClick={table}><a href="#">Table</a></li>
      </ul>
      {inpage}

     
    </>
  )

}


export default Test