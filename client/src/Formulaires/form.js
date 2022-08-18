import axios from 'axios'
import { useState, React, useEffect } from 'react'
import logo from 'F:\\RAM PROJECT\\SMQ-ROYAL-AIR-MAROC-new\\client\\src\\img\\logo.jpg'
import { useHistory, useParams } from "react-router-dom";
import e from 'cors';

function Test(props) {
  
  var [page, setPage] = useState([]);
  var [data, setData] = useState({});
  var [data1, setData1] = useState({});
  var [data2, setData2] = useState({});
  var [data3, setData3] = useState({});
  var [half, setHalf] = useState([]);
  let [performance, setPerformace] = useState([]);
  let [performance1, setPerformace1] = useState([]);
  let [performance2, setPerformace2] = useState([]);
  let [performance3, setPerformace3] = useState([]);
  let [performance4, setPerformace4] = useState([]);
  let [performance5, setPerformace5] = useState([]);
  let [performance6, setPerformace6] = useState([]);
  let [performance7, setPerformace7] = useState([]);




  let [tablo, setTablo] = useState([]);
  let [tablo1, setTablo1] = useState([]);
  let [tablo2, setTablo2] = useState([]);
  let [tablo3, setTablo3] = useState([]);
  let [tablo4, setTablo4] = useState([]);
  let [tablo5, setTablo5] = useState([]);
  let [tablo6, setTablo6] = useState([]);
  let [tablo7, setTablo7] = useState([]);
  let [deletor, setDeletor] = useState([])
  let [nom, setNom] = useState();
  let [def, setDef] = useState();
  let [form, setForm] = useState();
  let [Responsable, setResponsable] = useState();
  let [period, setPeriod] = useState();
  let [threepoint, setThreepoint] = useState();
  let counter = 0;
  let { userid } = useParams();
  var [ee, setEe] = useState(1)
  let history = useHistory();
  let [facts, setFacts] = useState(true)
  let [finalIndex, setFinalIndex] = useState()
  let [title, setTitle] = useState()
  let [date, setDate] = useState();
  let [bigData, setBigData] = useState();



  function okrow() {
    axios.post("http://localhost:3002/api/insertfirstable", { "nom": nom, "def": def, "form": form, "Responsable": Responsable, "period": period, answer: window.token }).then((response) => {
      axios.get("http://localhost:3002/api/getperformance", { params: { 'id': userid } }).then((response) => {
        setThreepoint(false); setTablo(response.data); setPerformace(response.data);


        // )
      })

    })
  }
  useEffect(() => {
    axios.get("http://localhost:3002/api/getpage", { params: { id: userid, "which": props.well } }).then((response) => {

      setPage(response.data)
    })
  }, [deletor])
  function todone(temp, e) {

    axios.post("http://localhost:3002/api/updateelement", { "id": temp, "data": data[e] }).then(
      axios.get("http://localhost:3002/api/getpage", { params: { id: userid } }).then((response) => {

        setPage(response.data)
      })
    );

  }
  function todelete(temp) {
    axios.get("http://localhost:3002/api/deleteelement", { params: { "id": temp } }).then(
      axios.get("http://localhost:3002/api/getpage", { params: { id: userid } }).then((response) => {

        // setPage(response.data)
      })

    );
  }
  function textarea() {
    axios.post("http://localhost:3002/api/addtextarea").then(
      axios.get("http://localhost:3002/api/getpage", { params: { id: userid } }).then((response) => {

        // setPage(response.data)
      })
    )
  }
  function input() {
    axios.post("http://localhost:3002/api/addinput").then(
      axios.get("http://localhost:3002/api/getpage", { params: { id: userid } }).then((response) => {

        // setPage(response.data)
      })
    )
  }
  function semizonetext() {
    axios.post("http://localhost:3002/api/addsemiinput").then(
      axios.get("http://localhost:3002/api/getpage", { params: { id: userid } }).then((response) => {

        // setPage(response.data)
      })
    )
  }
  function semilibellé() {
    axios.post("http://localhost:3002/api/addsemilibelle").then(
      axios.get("http://localhost:3002/api/getpage", { params: { id: userid } }).then((response) => {

        // setPage(response.data)
      }))
  }
  function thirdzonetext() {
    axios.post("http://localhost:3002/api/addthirdinput").then(
      axios.get("http://localhost:3002/api/getpage", { params: { id: userid } }).then((response) => {
        // setPage(response.data)
      })
    )
  }
  function thirdzonelibellé() {
    axios.post("http://localhost:3002/api/thirdzonelib").then(
      axios.get("http://localhost:3002/api/getpage", { params: { id: userid } }).then((response) => {

        // setPage(response.data)
      })
    )
  }
  function table() {
    axios.post("http://localhost:3002/api/addtable", { "user": userid }).then(
      axios.get("http://localhost:3002/api/getpage", { params: { id: userid } }).then((response) => {

        // setPage(response.data)
      })
    )


  }

  useEffect(() => {
    // copy paste this to apply changes without manual reload :)
    axios.get("http://localhost:3002/api/getpage", { params: { id: userid, 'which': props.well } }).then((response) => {



      setPage(response.data);
    
      if (props.well === 'ci') {
        axios.get("http://localhost:3002/api/getperformance", { params: { "id": userid } }).then((response) => {
          setTablo(response.data); setPerformace(response.data)
          response.data.forEach((item, index) => {
          
            tablo[index].Nom_indicateur = item.Nom_indicateur;
            tablo[index].Definition = item.Definition;
            tablo[index].Formule = item.Formule;
            tablo[index].Responsable_maj = item.Responsable_maj;
            tablo[index].Periodicite = item.Periodicite;



          })

        })


      }
    

      if (props.well === 'rp') {
      
        axios.get("http://localhost:3002/api/getperformance1", { params: { "id": userid } }).then((response) => {
          setTablo1(response.data); 
          setPerformace1(response.data)
          response.data.forEach((item, index) => {
         
            tablo1[index].constat = item.constat;
            tablo1[index].actions = item.actions;
            tablo1[index].responsable = item.responsable;
            tablo1[index].Responsable_maj = item.Responsable_maj;
            tablo1[index].dateprevu = item.Periodicite;
            tablo1[index].etat = item.etat;



          })

        })
        axios.get("http://localhost:3002/api/getperformance2", { params: { "id": userid } }).then((response) => {
          setTablo2(response.data); setPerformace2(response.data)
        


          response.data.forEach((item, index) => {

            tablo2[index].constat = item.constat;
            tablo2[index].actions = item.actions;
            tablo2[index].responsable = item.responsable;
            tablo2[index].Responsable_maj = item.Responsable_maj;
            tablo2[index].dateprevu = item.Periodicite;
            tablo2[index].etat = item.etat;




          })

        })
        axios.get("http://localhost:3002/api/getperformance3", { params: { "id": userid } }).then((response) => {
          setTablo3(response.data); setPerformace3(response.data)
        


          response.data.forEach((item, index) => {

            tablo3[index].constat = item.constat;
            tablo3[index].actions = item.actions;
            tablo3[index].responsable = item.responsable;
            tablo3[index].Responsable_maj = item.Responsable_maj;
            tablo3[index].dateprevu = item.Periodicite;
            tablo3[index].etat = item.etat;




          })

        })
        axios.get("http://localhost:3002/api/getperformance4", { params: { "id": userid } }).then((response) => {
          setTablo4(response.data); setPerformace4(response.data)
        


          response.data.forEach((item, index) => {

            tablo4[index].constat = item.constat;
            tablo4[index].actions = item.actions;
            tablo4[index].responsable = item.responsable;
            tablo4[index].Responsable_maj = item.Responsable_maj;
            tablo4[index].dateprevu = item.Periodicite;
            tablo4[index].etat = item.etat;




          })

        })
        axios.get("http://localhost:3002/api/getperformance5", { params: { "id": userid } }).then((response) => {
          setTablo5(response.data); setPerformace5(response.data)
        


          response.data.forEach((item, index) => {

            tablo5[index].constat = item.constat;
            tablo5[index].actions = item.actions;
            tablo5[index].responsable = item.responsable;
            tablo5[index].Responsable_maj = item.Responsable_maj;
            tablo5[index].dateprevu = item.Periodicite;
            tablo5[index].etat = item.etat;




          })

        })
        axios.get("http://localhost:3002/api/getperformance6", { params: { "id": userid } }).then((response) => {
          setTablo6(response.data); setPerformace6(response.data)
        


          response.data.forEach((item, index) => {
            tablo6[index].Saction = item.Saction;
            tablo6[index].NTaction = item.NTaction;
            tablo6[index].NAentam = item.NAentam;
            tablo6[index].NAclot = item.NAclot;
            tablo6[index].NAeffic = item.NAeffic;
         




          })

        })
        axios.get("http://localhost:3002/api/getperformance5", { params: { "id": userid } }).then((response) => {
          setTablo5(response.data); setPerformace5(response.data)
        


          response.data.forEach((item, index) => {

            tablo5[index].constat = item.constat;
            tablo5[index].actions = item.actions;
            tablo5[index].responsable = item.responsable;
            tablo5[index].Responsable_maj = item.Responsable_maj;
            tablo5[index].dateprevu = item.Periodicite;
            tablo5[index].etat = item.etat;




          })

        })
        axios.get("http://localhost:3002/api/getperformance7", { params: { "id": userid } }).then((response) => {
          setTablo7(response.data); setPerformace7(response.data)
        

          // ex,pip,oui1,explication,action,ref,id_user,oui2

          response.data.forEach((item, index) => {
            tablo7[index].ex= item.ex;
            tablo7[index].pip = item.pip;
            tablo7[index].oui1 = item.oui1;

            tablo7[index].explication= item.explication;
            tablo7[index].action = item.ref;
            tablo7[index].ref = item.ref;
            tablo7[index].oui2 = item.oui2;

         




          })

        })
      }

    }

    )
    axios.get("http://localhost:3002/api/getlatestdate", { params: { 'data': userid } }).then((response) => setDate(response.data[0].well.slice(2, 10)))

    axios.get("http://localhost:3002/api/getformname", { params: { 'data': userid } }).then((response) => setTitle(response.data[0].id_proc + '-' + response.data[0].titre))
  }, [])
  function rowok(index) {
    axios.post("http://localhost:3002/api/updaterow", { 'data': tablo[index] }).then(
    )
  }
  function rowok1(index) {
    console.log(tablo1)
    axios.post("http://localhost:3002/api/updaterow1", { 'data': tablo1[index] }).then(
    )
  }
  function rowok2(index) {
    axios.post("http://localhost:3002/api/updaterow2", { 'data': tablo2[index] }).then(
    )
  }
  function rowok3(index) {
    axios.post("http://localhost:3002/api/updaterow3", { 'data': tablo3[index] }).then(
    )
  }
  function rowok4(index) {
    axios.post("http://localhost:3002/api/updaterow4", { 'data': tablo4[index] }).then(
    )
  }
  function rowok5(index) {
    axios.post("http://localhost:3002/api/updaterow5", { 'data': tablo5[index] }).then(
    )
  }
  function rowok6(index) {
    axios.post("http://localhost:3002/api/updaterow6", { 'data': tablo6[index] }).then(
    )
  }
  function rowok7(index) {
    axios.post("http://localhost:3002/api/updaterow7", { 'data': tablo7[index] }).then(
    )
  }
  function rowdelete(index) {
    axios.post("http://localhost:3002/api/deleterow", { 'data': tablo[index].idIndi_Performance }).then(
      axios.get("http://localhost:3002/api/getperformance", { params: { 'id': userid } }).then((response) => { setThreepoint(false); setTablo(response.data); setPerformace(response.data) })


    )
  }

  let bool = true;
  let bool1 = true;
  function testest(e, index) {
    data1[index + '+input'] = e.target.value;
    data2[index + '+input'] = e.target.value;
    data3[index + '+input'] = e.target.value;

   
  }
  function smart() {
    if (props.well == "ci") {
      axios.post("http://localhost:3002/api/addnewrow", { 'id': userid }).then((response) => {
        axios.get("http://localhost:3002/api/getperformance", { params: { 'id': userid } }).then((response) => {
        

          setPerformace(response.data)
        })



      });
    }
    if (props.well == "rp") {
      axios.post("http://localhost:3002/api/addnewrow1", { 'id': userid }).then((response) => {
        axios.get("http://localhost:3002/api/getperformance1", { params: { 'id': userid } }).then((response) => {
         

          setPerformace1(response.data)
        })
       


      })
    }

  }
  function smart2() {
    if (props.well == "ci") {
      axios.post("http://localhost:3002/api/addnewrow", { 'id': userid }).then((response) => {
        axios.get("http://localhost:3002/api/getperformance", { params: { 'id': userid } }).then((response) => {
         
          setPerformace(response.data)
        })



      });
    }
    if (props.well == "rp") {
      axios.post("http://localhost:3002/api/addnewrow2", { 'id': userid }).then((response) => {
        axios.get("http://localhost:3002/api/getperformance2", { params: { 'id': userid } }).then((response) => {
         

          setPerformace2(response.data)
        })
       


      })
    }

  }
  function smart3() {
    if (props.well == "ci") {
      axios.post("http://localhost:3002/api/addnewrow", { 'id': userid }).then((response) => {
        axios.get("http://localhost:3002/api/getperformance", { params: { 'id': userid } }).then((response) => {
         
          setPerformace(response.data)
        })



      });
    }
    if (props.well == "rp") {
      axios.post("http://localhost:3002/api/addnewrow3", { 'id': userid }).then((response) => {
        axios.get("http://localhost:3002/api/getperformance3", { params: { 'id': userid } }).then((response) => {
         

          setPerformace3(response.data)
        })
       


      })
    }

  }
  function smart4() {
    if (props.well == "ci") {
      axios.post("http://localhost:3002/api/addnewrow", { 'id': userid }).then((response) => {
        axios.get("http://localhost:3002/api/getperformance", { params: { 'id': userid } }).then((response) => {
         
          setPerformace(response.data)
        })



      });
    }
    if (props.well == "rp") {
      axios.post("http://localhost:3002/api/addnewrow4", { 'id': userid }).then((response) => {
        axios.get("http://localhost:3002/api/getperformance4", { params: { 'id': userid } }).then((response) => {
         

          setPerformace4(response.data)
        })
       


      })
    }

  }
  function smart5() {
    if (props.well == "ci") {
      axios.post("http://localhost:3002/api/addnewrow", { 'id': userid }).then((response) => {
        axios.get("http://localhost:3002/api/getperformance", { params: { 'id': userid } }).then((response) => {
         
          setPerformace(response.data)
        })



      });
    }
    if (props.well == "rp") {
      axios.post("http://localhost:3002/api/addnewrow5", { 'id': userid }).then((response) => {
        axios.get("http://localhost:3002/api/getperformance5", { params: { 'id': userid } }).then((response) => {
         

          setPerformace5(response.data)
        })
       


      })
    }

  }
  function smart6() {
    if (props.well == "ci") {
      axios.post("http://localhost:3002/api/addnewrow", { 'id': userid }).then((response) => {
        axios.get("http://localhost:3002/api/getperformance", { params: { 'id': userid } }).then((response) => {
         
          setPerformace(response.data)
        })



      });
    }
    if (props.well == "rp") {
      axios.post("http://localhost:3002/api/addnewrow6", { 'id': userid }).then((response) => {
        axios.get("http://localhost:3002/api/getperformance6", { params: { 'id': userid } }).then((response) => {
         

          setPerformace6(response.data)
        })
       


      })
    }

  }
  function smart7() {
    if (props.well == "ci") {
      axios.post("http://localhost:3002/api/addnewrow", { 'id': userid }).then((response) => {
        axios.get("http://localhost:3002/api/getperformance", { params: { 'id': userid } }).then((response) => {
         
          setPerformace(response.data)
        })



      });
    }
    if (props.well == "rp") {
      axios.post("http://localhost:3002/api/addnewrow7", { 'id': userid }).then((response) => {
        axios.get("http://localhost:3002/api/getperformance7", { params: { 'id': userid } }).then((response) => {
         

          setPerformace7(response.data)
        })
       


      })
    }

  }
  var inpage = page.map((temp, index) => {

   
    if (temp.type === "input") {
      data1[ee + '+input'] = temp.contenue;
      data2[ee + '+input'] = temp.contenue;
      data3[ee + '+input'] = temp.contenue;

      let weird = ee;
      ee = ee + 1;

      data[index] = temp.contenue
      return (<div className='flextext1'><input onChange={(e) => { data[index] = e.target.value; testest(e, weird); }} className='label' type="text" defaultValue={temp.contenue}></input>
        <span onClick={() => todelete(temp.idelement)} class="material-symbols-outlined point">close</span></div>)

    }
    if (temp.type === "halflib") {
      data1[ee + '+halflib'] = temp.contenue
      data2[ee + '+halflib'] = temp.contenue
      data3[ee + '+halflib'] = temp.contenue

      let weird = ee;
      ee = ee + 1
      data[index] = temp.contenue
      // (()=>{setHalf(...half,1)})
      return (<span className={bool ? 'flextext1 half1' : 'flextext nass'}><input onChange={(e) => { data[index] = e.target.value; data1[weird + '+halflib'] = e.target.value; }} className='label' type="text" defaultValue={temp.contenue}></input>

        {bool = !bool}
        <span onClick={() => todelete(temp.idelement)} class="material-symbols-outlined point">close</span></span>)
    }

    if (temp.type === "halfinput") {
      data1[ee + '+halfinput'] = temp.contenue;
      data2[ee + '+halfinput'] = temp.contenue;
      data3[ee + '+halfinput'] = temp.contenue;

      let weird = ee;
      ee = ee + 1;
      data[index] = temp.contenue
      // (()=>{setHalf(...half,1)})
      return (<span className={bool ? 'flextext half' : 'flextext nass'}><textarea onChange={(e) => { data[index] = e.target.value; data1[weird + '+halfinput'] = e.target.value; }} className='labelarea' type="text" defaultValue={temp.contenue}></textarea>

        {bool = !bool}
        <span onClick={() => todelete(temp.idelement)} class="material-symbols-outlined point">close</span></span>)
    }
    if (temp.type === "thirdlib") {
      data1[ee + '+thirdlib'] = temp.contenue;
      data2[ee + '+thirdlib'] = temp.contenue;
      data3[ee + '+thirdlib'] = temp.contenue


      let weird = ee;
      ee = ee + 1
      data[index] = temp.contenue
      if (counter > 2) { counter = 0; bool1 = true }
      counter += 1;
      // (()=>{setHalf(...half,1)})
      return (<span className={bool1 ? `flextext1 libthird${counter}` : 'flextext nass'}><input onChange={(e) => { data[index] = e.target.value; data1[weird + '+thirdlib'] = e.target.value; }} className='label' type="text" defaultValue={temp.contenue}></input>

        {counter == 2 ? (bool1 = !bool1) : (bool1 = bool1)}

       


        <span onClick={() => todelete(temp.idelement)} class="material-symbols-outlined point">close</span></span>)
    }
    if (temp.type === "thirdinput") {
      data1[ee + '+thirdinput'] = temp.contenue;
      data2[ee + '+thirdinput'] = temp.contenue;
      data3[ee + '+thirdinput'] = temp.contenue

      let weird = ee;
      ee = ee + 1
      data[index] = temp.contenue
      if (counter > 2) { counter = 0; bool1 = true }
      counter += 1;
      // (()=>{setHalf(...half,1)})
      return (<span className={bool1 ? `flextext halfthird${counter}` : 'flextext nass'}><textarea onChange={(e) => { data[index] = e.target.value; data1[weird + '+thirdinput'] = e.target.value; }} className='labelarea' type="text" defaultValue={temp.contenue}></textarea>

        {counter == 2 ? (bool1 = !bool1) : (bool1 = bool1)}

       


        <span onClick={() => todelete(temp.idelement)} class="material-symbols-outlined point">close</span></span>)
    }

    if (temp.type === "textarea") {

      data1[ee + '+textarea'] = temp.contenue;
      data2[ee + '+textarea'] = temp.contenue;
      data3[ee + '+textarea'] = temp.contenue


      let weird = ee;
      ee = ee + 1
      data[index] = temp.contenue
      return <div className='flextext big'><textarea onChange={(e) => {
        data[index] = e.target.value; data1[weird + '+textarea'] = e.target.value;
      }} className='textarea' defaultValue={temp.contenue}></textarea>
        <span onClick={() => todelete(temp.idelement)} class="material-symbols-outlined point">close</span>
      </div>


    }

    if (temp.type === 'table' && props.well === "ci") {
      data1[ee + '+table'] = temp.contenue

      let weird = ee;
      ee = ee + 1
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

           
            {performance.map((lol, index) => {


              finalIndex = index

              return (
                <tr>
                  <td>

                    <textarea onChange={(e) => { tablo[index].Nom_indicateur = e.target.value; console.log(data1); ; }} defaultValue={lol.Nom_indicateur}></textarea>
                  </td>
                  <td>
                    <textarea onChange={(e) => { tablo[index].Definition = e.target.value; console.log(data1);  }} defaultValue={lol.Definition}></textarea>
                  </td>
                  <td>
                    <textarea onChange={(e) => { tablo[index].Formule = e.target.value;  console.log(data1); }} defaultValue={lol.Formule}></textarea>

                  </td>
                  <td>
                    <textarea onChange={(e) => { tablo[index].Responsable_maj = e.target.value;console.log(data1);  }} defaultValue={lol.Responsable_maj}></textarea>


                  </td>
                  <td>
                    <textarea onChange={(e) => { tablo[index].Periodicite = e.target.value;console.log(data1);;  }} defaultValue={lol.Periodicite}></textarea>


                  </td>



                  <td>

                    <span onClick={() => rowok(index)} className="material-symbols-outlined point">done</span>
                    <span onClick={() => rowdelete(index)} class="material-symbols-outlined point">close</span>

                  </td>

                </tr>
              )
            })}
            {/* {data1[weird+'+table'] = tablo} */}



          </tbody>
          <button onClick={() => { smart() }}>Add</button>
        </table>
      )



    }
    console.log("beforeeee")
    console.log(data2)
    if (temp.type === 'table1' && props.well === "rp") {
      console.log("afterrrrr")

      data2[ee + '+table1'] = temp.contenue
      let weird = ee;
      ee = ee + 1;
     

      return (
        <table className='table-left' >
        

          <tbody>
            <tr>
              <th>Constat</th>
              <th>Actions</th>
              <th>Responsable</th>
              <th>Date prévue</th>
              <th>Etat d’avancement</th>
              <th><span onClick={() => todelete(temp.idelement)} className="material-symbols-outlined point outred">close</span></th>
            </tr>
            {performance1.map((guess, index) => {
             

              finalIndex = index

              return (
                <tr>
                  <td>

                    <textarea onChange={(e) => { tablo1[index].constat = e.target.value; ;console.log(data2) }} defaultValue={guess.constat}></textarea>
                  </td>
                  <td>
                    <textarea onChange={(e) => { tablo1[index].actions = e.target.value;  }} defaultValue={guess.actions}></textarea>
                  </td>
                  <td>
                    <textarea onChange={(e) => { tablo1[index].responsable = e.target.value;  }} defaultValue={guess.responsable}></textarea>

                  </td>
                  <td>
                    <textarea onChange={(e) => { tablo1[index].dateprevu = e.target.value;   }} defaultValue={guess.dateprevu}></textarea>


                  </td>
                  <td>
                    <textarea onChange={(e) => { tablo1[index].etat = e.target.value;   }} defaultValue={guess.etat}></textarea>


                  </td>




                  <td>

                    <span onClick={() => rowok1(index)} className="material-symbols-outlined point">done</span>
                    <span onClick={() => rowdelete(index)} class="material-symbols-outlined point">close</span>

                  </td>

                </tr>
              )
            })}
            {/* {data1[weird+'+table'] = tablo} */}



          </tbody>
          <button onClick={() => { smart() }}>Add</button>
        </table>
      )



    }
    if (temp.type === 'table2' && props.well === "rp") {
      data2[ee + '+table2'] = temp.contenue
      let weird = ee;
      ee = ee + 1
      return (
        <table className='table-left' >
          <tbody>
            <tr>
              <th>Constat</th>
              <th>Actions</th>
              <th>Responsable</th>
              <th>Date prévue</th>
              <th>Etat d’avancement</th>
              <th><span onClick={() => todelete(temp.idelement)} className="material-symbols-outlined point outred">close</span></th>
            </tr>
            
            {performance2.map((value, index) => {
          
            
             

              finalIndex = index

              return (
                <tr>
                  <td>

                    <textarea onChange={(e) => { tablo2[index].constat = e.target.value;  ; }} defaultValue={value.constat}></textarea>
                  </td>
                  <td>
                    <textarea onChange={(e) => { tablo2[index].actions = e.target.value;   }} defaultValue={value.actions}></textarea>
                  </td>
                  <td>
                    <textarea onChange={(e) => { tablo2[index].responsable = e.target.value;   }} defaultValue={value.responsable}></textarea>

                  </td>
                  <td>
                    <textarea onChange={(e) => { tablo2[index].dateprevu = e.target.value;   }} defaultValue={value.dateprevu}></textarea>


                  </td>
                  <td>
                    <textarea onChange={(e) => { tablo2[index].etat = e.target.value;  }} defaultValue={value.etat}></textarea>


                  </td>




                  <td>

                    <span onClick={() => rowok2(index)} className="material-symbols-outlined point">done</span>
                    <span onClick={() => rowdelete(index)} class="material-symbols-outlined point">close</span>

                  </td>

                </tr>
              )
            })}
            {/* {data1[weird+'+table'] = tablo} */}



          </tbody>
          <button onClick={() => { smart2() }}>Add</button>
        </table>
      )



    }
    if (temp.type === 'table3' && props.well === "rp") {
      data2[ee + '+table3'] = temp.contenue
      let weird = ee;
      ee = ee + 1
      return (
        <table className='table-left' >
          <tbody>
            <tr>
              <th>Constat</th>
              <th>Actions</th>
              <th>Responsable</th>
              <th>Date prévue</th>
              <th>Etat d’avancement</th>
              <th><span onClick={() => todelete(temp.idelement)} className="material-symbols-outlined point outred">close</span></th>
            </tr>
            
            {performance3.map((value, index) => {
          
            
             

              finalIndex = index

              return (
                <tr>
                  <td>

                    <textarea onChange={(e) => { tablo3[index].constat = e.target.value;  ; }} defaultValue={value.constat}></textarea>
                  </td>
                  <td>
                    <textarea onChange={(e) => { tablo3[index].actions = e.target.value;   }} defaultValue={value.actions}></textarea>
                  </td>
                  <td>
                    <textarea onChange={(e) => { tablo3[index].responsable = e.target.value;   }} defaultValue={value.responsable}></textarea>

                  </td>
                  <td>
                    <textarea onChange={(e) => { tablo3[index].dateprevu = e.target.value;   }} defaultValue={value.dateprevu}></textarea>


                  </td>
                  <td>
                    <textarea onChange={(e) => { tablo3[index].etat = e.target.value;  }} defaultValue={value.etat}></textarea>


                  </td>




                  <td>

                    <span onClick={() => rowok3(index)} className="material-symbols-outlined point">done</span>
                    <span onClick={() => rowdelete(index)} class="material-symbols-outlined point">close</span>

                  </td>

                </tr>
              )
            })}
            {/* {data1[weird+'+table'] = tablo} */}



          </tbody>
          <button onClick={() => { smart3() }}>Add</button>
        </table>
      )



    }
    if (temp.type === 'table4' && props.well === "rp") {
      data2[ee + '+table4'] = temp.contenue
      let weird = ee;
      ee = ee + 1
      return (
        <table className='table-left' >
          <tbody>
            <tr>
              <th>Constat</th>
              <th>Actions</th>
              <th>Responsable</th>
              <th>Date prévue</th>
              <th>Etat d’avancement</th>
              <th><span onClick={() => todelete(temp.idelement)} className="material-symbols-outlined point outred">close</span></th>
            </tr>
            
            {performance4.map((value, index) => {
          
            
             

              finalIndex = index

              return (
                <tr>
                  <td>

                    <textarea onChange={(e) => { tablo4[index].constat = e.target.value;  ; }} defaultValue={value.constat}></textarea>
                  </td>
                  <td>
                    <textarea onChange={(e) => { tablo4[index].actions = e.target.value;   }} defaultValue={value.actions}></textarea>
                  </td>
                  <td>
                    <textarea onChange={(e) => { tablo4[index].responsable = e.target.value;   }} defaultValue={value.responsable}></textarea>

                  </td>
                  <td>
                    <textarea onChange={(e) => { tablo4[index].dateprevu = e.target.value;   }} defaultValue={value.dateprevu}></textarea>


                  </td>
                  <td>
                    <textarea onChange={(e) => { tablo4[index].etat = e.target.value;  }} defaultValue={value.etat}></textarea>


                  </td>




                  <td>

                    <span onClick={() => rowok4(index)} className="material-symbols-outlined point">done</span>
                    <span onClick={() => rowdelete(index)} class="material-symbols-outlined point">close</span>

                  </td>

                </tr>
              )
            })}
            {/* {data1[weird+'+table'] = tablo} */}



          </tbody>
          <button onClick={() => { smart4() }}>Add</button>
        </table>
      )



    }
    if (temp.type === 'table5' && props.well === "rp") {
      data2[ee + '+table5'] = temp.contenue
      let weird = ee;
      ee = ee + 1
      return (
        <table className='table-left' >
          <tbody>
            <tr>
              <th>Constat</th>
              <th>Actions</th>
              <th>Responsable</th>
              <th>Date prévue</th>
              <th>Etat d’avancement</th>
              <th><span onClick={() => todelete(temp.idelement)} className="material-symbols-outlined point outred">close</span></th>
            </tr>
            
            {performance5.map((value, index) => {
          
            
             

              finalIndex = index

              return (
                <tr>
                  <td>

                    <textarea onChange={(e) => { tablo5[index].constat = e.target.value;  ; }} defaultValue={value.constat}></textarea>
                  </td>
                  <td>
                    <textarea onChange={(e) => { tablo5[index].actions = e.target.value;   }} defaultValue={value.actions}></textarea>
                  </td>
                  <td>
                    <textarea onChange={(e) => { tablo5[index].responsable = e.target.value;   }} defaultValue={value.responsable}></textarea>

                  </td>
                  <td>
                    <textarea onChange={(e) => { tablo5[index].dateprevu = e.target.value;   }} defaultValue={value.dateprevu}></textarea>


                  </td>
                  <td>
                    <textarea onChange={(e) => { tablo5[index].etat = e.target.value;  }} defaultValue={value.etat}></textarea>


                  </td>




                  <td>

                    <span onClick={() => rowok5(index)} className="material-symbols-outlined point">done</span>
                    <span onClick={() => rowdelete(index)} class="material-symbols-outlined point">close</span>

                  </td>

                </tr>
              )
            })}
            {/* {data1[weird+'+table'] = tablo} */}



          </tbody>
          <button onClick={() => { smart5() }}>Add</button>
        </table>
      )



    }
    if (temp.type === 'table6' && props.well === "rp") {
      data2[ee + '+table6'] = temp.contenue
      let weird = ee;
      ee = ee + 1
      return (
        <table className='table-left' >
          <tbody>
            <tr>
              <th>Source Action</th>
              <th>Nombre total d'action</th>
              <th>Nombre d'actions entamées</th>
              <th>Nombre d'actions clôtures</th>
              <th>Nombre d'actions efficaces</th>
              <th><span onClick={() => todelete(temp.idelement)} className="material-symbols-outlined point outred">close</span></th>
            </tr>
            
            {performance6.map((value, index) => {
          
            
             

              finalIndex = index

              return (
                <tr>
                    <td>

                <textarea onChange={(e) => { tablo6[index].Saction  = e.target.value;  ; }} defaultValue={value.Saction}></textarea>
</td>
                  <td>

                    <textarea onChange={(e) => { tablo6[index].NTaction  = e.target.value;  ; }} defaultValue={value.NTaction}></textarea>
                  </td>
                  <td>
                    <textarea onChange={(e) => {  tablo6[index].NAentam  = e.target.value;   }} defaultValue={value.NAentam}></textarea>
                  </td>
                  <td>
                    <textarea onChange={(e) => {  tablo6[index].NAclot = e.target.value;   }} defaultValue={value.NAclot}></textarea>

                  </td>
                  <td>
                    <textarea onChange={(e) => { tablo6[index].NAeffic= e.target.value;   }} defaultValue={value.NAeffic}></textarea>


                  </td>
              




                  <td>

                    <span onClick={() => rowok6(index)} className="material-symbols-outlined point">done</span>
                    <span onClick={() => rowdelete(index)} class="material-symbols-outlined point">close</span>

                  </td>

                </tr>
              )
            })}
            {/* {data1[weird+'+table'] = tablo} */}



          </tbody>
          <button onClick={() => { smart6() }}>Add</button>
        </table>
      )



    }
    if (temp.type === 'table7' && props.well === "rp") {
      data2[ee + '+table7'] = temp.contenue
      let weird = ee;
      ee = ee + 1
      return (
        <table  className='table-left' >
          <tbody>
          <tr>
              <th>Libellé Opportunité</th>
              <th>Source Opportunité </th>
              <th colSpan={2}>Faisabilité selon les critères pertinents: faisabilité technique, financière, etc.</th>
              <th>Accord du Directeur DDIT</th>
              <th colSpan={2}>Actions conclues</th>
            
            </tr>
            <tr>
              <th>Ex: fournirure de services SI à d'autres compagnies aériennes partenaires</th>
              <th>PIP; Changement de contexte politique, technique, etc.; </th>
              <th>Oui/Non</th>
              <th>Explication</th>
              <th>Oui/Non</th>
              <th>(actions à intégrer dans le JAME)</th>
              <th>Ref Action JAME</th>
              <th><span onClick={() => todelete(temp.idelement)} className="material-symbols-outlined point outred">close</span></th>
            </tr>
            
            {performance7.map((value, index) => {
          
            
             

              finalIndex = index

              return (
                <tr>
                    <td>
{/*  tablo7[index].ex= item.ex;
            tablo7[index].pip = item.pip;
            tablo7[index].explication= item.explication;
            tablo7[index].action = item.ref;
            tablo7[index].ref = item.ref;
            tablo7[index].id_user = item.id_user;
            tablo7[index].id_oui2 = item.oui2; */}
                <textarea onChange={(e) => { tablo7[index].ex=  e.target.value;  ; }} defaultValue={value.ex}></textarea>
</td>
                  <td>

                    <textarea onChange={(e) => {  tablo7[index].pip   = e.target.value;  ; }} defaultValue={value.pip}></textarea>
                  </td>
                  <td>
                    <textarea onChange={(e) => {  tablo7[index].oui1 = e.target.value;   }} defaultValue={value.oui1}></textarea>


                  </td>
                  <td>
                    <textarea onChange={(e) => { tablo7[index].explication = e.target.value;   }} defaultValue={value.explication}></textarea>
                  </td>
                  <td>
                    <textarea onChange={(e) => {    tablo7[index].oui2  =  e.target.value;   }} defaultValue={value.oui2}></textarea>


                  </td>
                  <td>

                    <textarea onChange={(e) => {    tablo7[index].action= e.target.value;   }} defaultValue={value.action}></textarea>

                  </td>
                  <td>
                    <textarea onChange={(e) => {  tablo7[index].ref = e.target.value;   }} defaultValue={value.ref}></textarea>


                  </td>
                 
                





                  <td>

                    <span onClick={() => rowok7(index)} className="material-symbols-outlined point">done</span>
                    <span onClick={() => rowdelete(index)} class="material-symbols-outlined point">close</span>

                  </td>

                </tr>
              )
            })}
            {/* {data1[weird+'+table'] = tablo} */}



          </tbody>
          <button onClick={() => { smart7() }}>Add</button>
        </table>
      )



    }












  })
  function confirmall() {

    if (props.well === "ci") {
      axios.post("http://localhost:3002/api/updateallpage", { 'data1': data1, 'user': userid }).then((response) => {
        axios.get("http://localhost:3002/api/getperformance", { params: { 'id': userid } }).then()
      })
      setData1({})
    }

    if (props.well == "rp") {
      console.log(data2)
      axios.post("http://localhost:3002/api/updateallpage1", { 'data1': data2, 'user': userid }).then((response) => {
        axios.get("http://localhost:3002/api/getperformance1", { params: { 'id': userid } }).then()
        axios.get("http://localhost:3002/api/getperformance2", { params: { 'id': userid } }).then()
        axios.get("http://localhost:3002/api/getperformance3", { params: { 'id': userid } }).then()
        axios.get("http://localhost:3002/api/getperformance4", { params: { 'id': userid } }).then()
        axios.get("http://localhost:3002/api/getperformance5", { params: { 'id': userid } }).then()
        axios.get("http://localhost:3002/api/getperformance6", { params: { 'id': userid } }).then()
        axios.get("http://localhost:3002/api/getperformance7", { params: { 'id': userid } }).then()

        setData2({})
      })
    }
  



  }
  return (
    <>
      <div className='top-bar-form'>
        <h1 className='bigtitle'>{title}</h1>
      </div>
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
      <h3 className='date'>Dernière modification le {date}</h3>
      <span className="material-symbols-outlined point alldone" onClick={() => confirmall()}>done</span>

    </>
  )

}


export default Test