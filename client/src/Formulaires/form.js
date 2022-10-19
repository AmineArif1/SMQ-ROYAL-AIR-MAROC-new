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
  var [data4, setData4] = useState({});
  var [data5, setData5] = useState({});
  var [data6, setData6] = useState({});
  var [half, setHalf] = useState([]);
  let [performance, setPerformace] = useState([]);
  let [performance1, setPerformace1] = useState([]);
  let [performance10, setPerformace10] = useState([]);
  let [performance11, setPerformace11] = useState([]);
  let [performance12, setPerformace12] = useState([]);
  let [performance13, setPerformace13] = useState([]);



  let [performance2, setPerformace2] = useState([]);
  let [performance3, setPerformace3] = useState([]);
  let [performance4, setPerformace4] = useState([]);
  let [performance5, setPerformace5] = useState([]);
  let [performance6, setPerformace6] = useState([]);
  let [performance7, setPerformace7] = useState([]);
  let [performance8, setPerformace8] = useState([]);
  let [performance9, setPerformace9] = useState([]);






  let [tablo, setTablo] = useState([]);
  let [tablo1, setTablo1] = useState([]);
  let [tablo2, setTablo2] = useState([]);
  let [tablo3, setTablo3] = useState([]);
  let [tablo4, setTablo4] = useState([]);
  let [tablo5, setTablo5] = useState([]);
  let [tablo6, setTablo6] = useState([]);
  let [tablo7, setTablo7] = useState([]);
  let [tablo8, setTablo8] = useState([]);
  let [tablo9, setTablo9] = useState([]);
  let [tablo10, setTablo10] = useState([]);
  let [tablo11, setTablo11] = useState([]);
  let [tablo12, setTablo12] = useState([]);
  let [tablo13, setTablo13] = useState([]);





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
      if (props.well === 'MDE') {
        axios.get("http://localhost:3002/api/getperformance10", { params: { "id": userid } }).then((response) => {
          setTablo10(response.data); setPerformace10(response.data)
          response.data.forEach((item, index) => {
          
            tablo10[index].NomD = item.NomD;
            tablo10[index].Respo = item.Respo;
            tablo10[index].Regle = item.Regle;
            tablo10[index].Elimination = item.Elimination;



          })

        })}
        if (props.well === 'MDI') {
          axios.get("http://localhost:3002/api/getperformance11", { params: { "id": userid } }).then((response) => {
            setTablo11(response.data); setPerformace11(response.data)
            response.data.forEach((item, index) => {
            
              tablo11[index].Ndocument = item.Ndocument;
              tablo11[index].Vdocument = item.Vdocument;
              tablo11[index].Redacteur = item.Redacteur;
              tablo11[index].Validation = item.Validation;
              tablo11[index].Approbateur= item.Approbateur;
              tablo11[index].Rdiffusion = item.Rdiffusion;
              tablo11[index].Eprime = item.Eprime;



  
  
  
            })
  
          })}
          if (props.well === 'MID') {
            axios.get("http://localhost:3002/api/getperformance12", { params: { "id": userid } }).then((response) => {
              setTablo12(response.data); setPerformace12(response.data)
              response.data.forEach((item, index) => {
              
                tablo12[index].Ndocument = item.Ndocument;
                tablo12[index].Identification= item.Identification;
                tablo12[index].Respo = item.Respo;
                tablo12[index].Stockage = item.Stockage;
                tablo12[index].Dure= item.Dure;
                tablo12[index].Prot = item.Prot;
                tablo12[index].Arch = item.Arc;
                tablo12[index].duree = item.duree;

  
  
  
    
    
    
              })
    
            })}
              if (props.well === 'SGN') {
            axios.get("http://localhost:3002/api/getperformance13", { params: { "id": userid } }).then((response) => {
              setTablo13(response.data); setPerformace13(response.data)
              response.data.forEach((item, index) => {
              
                tablo13[index].quoi = item.quoi;
                tablo13[index].qui= item.qui;
                tablo13[index].activite = item.activite;
                tablo13[index].dsm = item.dsm;
                tablo13[index].element= item.element;
                tablo13[index].quand = item.quand;
                tablo13[index].critere = item.critere;
                tablo13[index].info = item.info;
                tablo13[index].quoi2 = item.quoi2;
                tablo13[index].qui2 = item.qui2;
                tablo13[index].type = item.type;
                tablo13[index].quand2 = item.quand2;
                tablo13[index].comment = item.comment;



  
  
  
    
    
    
              })
    
            })}
  
    

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
        axios.get("http://localhost:3002/api/getperformance8", { params: { "id": userid } }).then((response) => {
          setTablo8(response.data); setPerformace8(response.data)
        

// audit8(Pint,Addit,Nddit,AtPI,NatPI,Roa,Ipi,id_user)
// 
          response.data.forEach((item, index) => {
            tablo8[index].Pint= item.Pint;
            tablo8[index].Addit = item.Addit;
            tablo8[index].Nddit = item.Nddit;

            tablo8[index].AtPI= item.AtPI;
            tablo8[index].NatPI= item.NatPI;
            tablo8[index].Roa = item.Roa;
            tablo8[index].Ipi = item.Ipi;

         




          })

        })

        axios.get("http://localhost:3002/api/getperformance9", { params: { "id": userid } }).then((response) => {
          setTablo9(response.data); setPerformace9(response.data)
        

// audit8(Pint,Addit,Nddit,AtPI,NatPI,Roa,Ipi,id_user)
// 
          response.data.forEach((item, index) => {
            tablo8[index].Fmarquant= item.Fmarquant;
            tablo8[index].Smq = item.Smq;
            tablo8[index].actions = item.actions;

       

         




          })

        })
      

    

  }})
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
  function rowok8(index) {
    console.log(tablo8)
    axios.post("http://localhost:3002/api/updaterow8", { 'data': tablo8[index] }).then(
    )
  }
  function rowok9(index) {
    console.log(tablo9)
    axios.post("http://localhost:3002/api/updaterow9", { 'data': tablo9[index] }).then(
    )
  }
  function rowok10(index) {
    console.log(tablo9)
    axios.post("http://localhost:3002/api/updaterow10", { 'data': tablo10[index] }).then(
    )
  }
  function rowok11(index) {
    console.log(tablo11)
    axios.post("http://localhost:3002/api/updaterow11", { 'data': tablo11[index] }).then(
    )
  }
  function rowok12(index) {
    console.log(tablo12)
    axios.post("http://localhost:3002/api/updaterow12", { 'data': tablo12[index] }).then(
    )
  }
  function rowok13(index) {
    console.log(tablo13)
    axios.post("http://localhost:3002/api/updaterow13", { 'data': tablo13[index] }).then(
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
    data4[index + '+input'] = e.target.value;
    data5[index + '+input'] = e.target.value;
    data6[index + '+input'] = e.target.value;




   
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
  function smart8() {
    if (props.well == "ci") {
      axios.post("http://localhost:3002/api/addnewrow", { 'id': userid }).then((response) => {
        axios.get("http://localhost:3002/api/getperformance", { params: { 'id': userid } }).then((response) => {
         
          setPerformace(response.data)
        })



      });
    }
    if (props.well == "rp") {
      axios.post("http://localhost:3002/api/addnewrow8", { 'id': userid }).then((response) => {
        axios.get("http://localhost:3002/api/getperformance8", { params: { 'id': userid } }).then((response) => {
         

          setPerformace8(response.data)
        })
       


      })
    }

  }
  function smart9() {
    if (props.well == "ci") {
      axios.post("http://localhost:3002/api/addnewrow", { 'id': userid }).then((response) => {
        axios.get("http://localhost:3002/api/getperformance", { params: { 'id': userid } }).then((response) => {
         
          setPerformace(response.data)
        })



      });
    }
    if (props.well == "rp") {
      axios.post("http://localhost:3002/api/addnewrow9", { 'id': userid }).then((response) => {
        axios.get("http://localhost:3002/api/getperformance9", { params: { 'id': userid } }).then((response) => {
         

          setPerformace9(response.data)
        })
       


      })
    }

  }
  function smart10() {
    
    if (props.well == "MDE") {
      axios.post("http://localhost:3002/api/addnewrow10", { 'id': userid }).then((response) => {
        axios.get("http://localhost:3002/api/getperformance10", { params: { 'id': userid } }).then((response) => {
         

          setPerformace10(response.data)
        })
       


      })
    }

  }
  function smart11() {
    
    if (props.well == "MDI") {
      axios.post("http://localhost:3002/api/addnewrow11", { 'id': userid }).then((response) => {
        axios.get("http://localhost:3002/api/getperformance11", { params: { 'id': userid } }).then((response) => {
         

          setPerformace12(response.data)
        })
       


      })
    }

  }
  function smart12() {
    
    if (props.well == "MID") {
      axios.post("http://localhost:3002/api/addnewrow12", { 'id': userid }).then((response) => {
        axios.get("http://localhost:3002/api/getperformance12", { params: { 'id': userid } }).then((response) => {
         

          setPerformace12(response.data)
        })
       


      })
    }

  }
  function smart13() {
    
    if (props.well == "SGN") {
      axios.post("http://localhost:3002/api/addnewrow13", { 'id': userid }).then((response) => {
        axios.get("http://localhost:3002/api/getperformance13", { params: { 'id': userid } }).then((response) => {
         

          setPerformace13(response.data)
        })
       


      })
    }

  }
  var inpage = page.map((temp, index) => {

   
    if (temp.type === "input") {
      data1[ee + '+input'] = temp.contenue;
      data2[ee + '+input'] = temp.contenue;
      data3[ee + '+input'] = temp.contenue;
      data4[ee + '+input'] = temp.contenue;    
      data5[ee + '+input'] = temp.contenue;
      data6[ee + '+input'] = temp.contenue;




      let weird = ee;
      ee = ee + 1;

      data[index] = temp.contenue
      return (<div className='flextext1'><input onChange={(e) => { data[index] = e.target.value;data2[index] = e.target.value; testest(e, weird); }} className='label' type="text" defaultValue={temp.contenue}></input>
        <span onClick={() => todelete(temp.idelement)} class="material-symbols-outlined point">close</span></div>)

    }
    if (temp.type === "halflib") {
      data1[ee + '+halflib'] = temp.contenue
      data2[ee + '+halflib'] = temp.contenue
      data4[ee + '+halflib'] = temp.contenue
      data5[ee + '+halflib'] = temp.contenue
      data6[ee + '+halflib'] = temp.contenue



      let weird = ee;
      ee = ee + 1
      data[index] = temp.contenue
      // (()=>{setHalf(...half,1)})
      return (<span className={bool ? 'flextext1 half1' : 'flextext nass'}><input onChange={(e) => { data[index] = e.target.value;data4[weird + '+halflib'] = e.target.value;data6[weird + '+halflib'] = e.target.value;;data5[weird + '+halflib'] = e.target.value;;data1[weird + '+halflib'] = e.target.value;data2[weird + '+halflib'] = e.target.value;data3[weird + '+halflib'] = e.target.value; }} className='label' type="text" defaultValue={temp.contenue}></input>

        {bool = !bool}
        <span onClick={() => todelete(temp.idelement)} class="material-symbols-outlined point">close</span></span>)
    }

    if (temp.type === "halfinput") {
      data1[ee + '+halfinput'] = temp.contenue;
      data2[ee + '+halfinput'] = temp.contenue;
      data3[ee + '+halfinput'] = temp.contenue;
      data4[ee + '+halfinput'] = temp.contenue;
      data5[ee + '+halfinput'] = temp.contenue;
      data6[ee + '+halfinput'] = temp.contenue;


      let weird = ee;
      ee = ee + 1;
      data[index] = temp.contenue
      // (()=>{setHalf(...half,1)})
      return (<span className={bool ? 'flextext half' : 'flextext nass'}><textarea onChange={(e) => { data[index] = e.target.value; data4[weird + '+halfinput'] = e.target.value;data5[weird + '+halfinput'] = e.target.value;data6[weird + '+halfinput'] = e.target.value;data1[weird + '+halfinput'] = e.target.value;data3[weird + '+halfinput'] = e.target.value; data2[weird + '+halfinput'] = e.target.value; }} className='labelarea' type="text" defaultValue={temp.contenue}></textarea>

        {bool = !bool}
        <span onClick={() => todelete(temp.idelement)} class="material-symbols-outlined point">close</span></span>)
    }
    if (temp.type === "thirdlib") {
      data1[ee + '+thirdlib'] = temp.contenue;
      data2[ee + '+thirdlib'] = temp.contenue;
      data3[ee + '+thirdlib'] = temp.contenue;
      data4[ee + '+thirdlib'] = temp.contenue;
      data5[ee + '+thirdlib'] = temp.contenue;
      data6[ee + '+thirdlib'] = temp.contenue





      let weird = ee;
      ee = ee + 1
      data[index] = temp.contenue
      if (counter > 2) { counter = 0; bool1 = true }
      counter += 1;
      // (()=>{setHalf(...half,1)})
      return (<span className={bool1 ? `flextext1 libthird${counter}` : 'flextext nass'}><input onChange={(e) => { data[index] = e.target.value; data4[weird + '+thirdlib'] = e.target.value;data5[weird + '+thirdlib'] = e.target.value;data6[weird + '+thirdlib'] = e.target.value;data3[weird + '+thirdlib'] = e.target.value;;data1[weird + '+thirdlib'] = e.target.value;data2[weird + '+thirdlib'] = e.target.value; }} className='label' type="text" defaultValue={temp.contenue}></input>

        {counter == 2 ? (bool1 = !bool1) : (bool1 = bool1)}

       


        <span onClick={() => todelete(temp.idelement)} class="material-symbols-outlined point">close</span></span>)
    }
    if (temp.type === "thirdinput") {
      data1[ee + '+thirdinput'] = temp.contenue;
      data2[ee + '+thirdinput'] = temp.contenue;
      data3[ee + '+thirdinput'] = temp.contenue;
      data4[ee + '+thirdinput'] = temp.contenue;
      data5[ee + '+thirdinput'] = temp.contenue;
      data6[ee + '+thirdinput'] = temp.contenue




      let weird = ee;
      ee = ee + 1
      data[index] = temp.contenue
      if (counter > 2) { counter = 0; bool1 = true }
      counter += 1;
      // (()=>{setHalf(...half,1)})
      return (<span className={bool1 ? `flextext halfthird${counter}` : 'flextext nass'}><textarea onChange={(e) => { data[index] = e.target.value; data4[weird + '+thirdinput'] = e.target.value; data5[weird + '+thirdinput'] = e.target.value; data6[weird + '+thirdinput'] = e.target.value;;data3[weird + '+thirdinput'] = e.target.value;;data1[weird + '+thirdinput'] = e.target.value;data2[weird + '+thirdinput'] = e.target.value; }} className='labelarea' type="text" defaultValue={temp.contenue}></textarea>

        {counter == 2 ? (bool1 = !bool1) : (bool1 = bool1)}

       


        <span onClick={() => todelete(temp.idelement)} class="material-symbols-outlined point">close</span></span>)
    }

    if (temp.type === "textarea") {

      data1[ee + '+textarea'] = temp.contenue;
      data2[ee + '+textarea'] = temp.contenue;
      data3[ee + '+textarea'] = temp.contenue;
      data4[ee + '+textarea'] = temp.contenue;
      data5[ee + '+textarea'] = temp.contenue;
      data6[ee + '+textarea'] = temp.contenue





      let weird = ee;
      ee = ee + 1
      data[index] = temp.contenue
      return <div className='flextext big'><textarea onChange={(e) => {
        data[index] = e.target.value;data3[weird + '+textarea'] = e.target.value;data4[weird + '+textarea'] = e.target.value;data5[weird + '+textarea'] = e.target.value;data6[weird + '+textarea'] = e.target.value;console.log(data4) ;data1[weird + '+textarea'] = e.target.value;data2[weird + '+textarea'] = e.target.value;
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
        <table className='table-left' >
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
    if (temp.type === 'table8' && props.well === "rp") {
      data2[ee + '+table8'] = temp.contenue
      let weird = ee;
      ee = ee + 1
      return (
        <table className='table-left' >
          <tbody>
    
       
            <tr>
              <th>Partie Intéressée </th>
              <th>Attentes DDIT </th>
              <th>Note Attentes DDIT</th>
              <th>Attentes PI</th>
              <th>Note Attentes PI</th>
              <th>Risque et (ou ) opportunité associé</th>
              <th>Information PI à surveiller </th>
              <th><span onClick={() => todelete(temp.idelement)} className="material-symbols-outlined point outred">close</span></th>
            </tr>
            
            {performance8.map((value, index) => {
          
            
             

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
                <textarea onChange={(e) => { tablo8[index].Pint=  e.target.value;  ; }} defaultValue={value.Pint}></textarea>
</td>
                  <td>

                    <textarea onChange={(e) => {  tablo8[index].Addit   = e.target.value;  ; }} defaultValue={value.Addit}></textarea>
                  </td>
                  <td>
                    <textarea onChange={(e) => {  tablo8[index].Nddit= e.target.value;   }} defaultValue={value.Nddit}></textarea>


                  </td>
                  <td>
                    <textarea onChange={(e) => { tablo8[index].AtPI = e.target.value;   }} defaultValue={value.AtPI}></textarea>
                  </td>
                  <td>
                    <textarea onChange={(e) => {    tablo8[index].NatPI  =  e.target.value;   }} defaultValue={value.NatPI}></textarea>


                  </td>
                  <td>

                    <textarea onChange={(e) => {    tablo8[index].Roa= e.target.value;   }} defaultValue={value.Roa}></textarea>

                  </td>
                  <td>
                    <textarea onChange={(e) => {  tablo8[index].Ipi = e.target.value;   }} defaultValue={value.Ipi}></textarea>


                  </td>
                 
                





                  <td>

                    <span onClick={() => rowok8(index)} className="material-symbols-outlined point">done</span>
                    <span onClick={() => rowdelete(index)} class="material-symbols-outlined point">close</span>

                  </td>

                </tr>
              )
            })}
            {/* {data1[weird+'+table'] = tablo} */}



          </tbody>
          <button onClick={() => { smart8() }}>Add</button>
        </table>
      )



    }
    if (temp.type === 'table9' && props.well === "rp") {
      data2[ee + '+table9'] = temp.contenue
      let weird = ee;
      ee = ee + 1
      return (
        <table className='table-left' >
          <tbody>
    
       
            <tr>
              <th>Fait marquant </th>
              <th>Impact sur le SMQ </th>
              <th>Note Attentes DDIT</th>
              <th>Actions</th>
            
              <th><span onClick={() => todelete(temp.idelement)} className="material-symbols-outlined point outred">close</span></th>
            </tr>
            
            {performance9.map((value, index) => {
          
            
             

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
                <textarea onChange={(e) => { tablo9[index].Fmarquant=  e.target.value;  ; }} defaultValue={value.Fmarquant}></textarea>
</td>
                  <td>

                    <textarea onChange={(e) => {  tablo9[index].Smq   = e.target.value;  ; }} defaultValue={value.Smq}></textarea>
                  </td>
                  <td>
                    <textarea onChange={(e) => {  tablo9[index].actions= e.target.value;   }} defaultValue={value.actions}></textarea>


                  </td>
              
                 
                





                  <td>

                    <span onClick={() => rowok9(index)} className="material-symbols-outlined point">done</span>
                    <span onClick={() => rowdelete(index)} class="material-symbols-outlined point">close</span>

                  </td>

                </tr>
              )
            })}
            {/* {data1[weird+'+table'] = tablo} */}



          </tbody>
          <button onClick={() => { smart9() }}>Add</button>
        </table>
      )



    }

    if (temp.type === 'table10' && props.well === "MDE") {
      data3[ee + '+table10'] = temp.contenue
      let weird = ee;
      ee = ee + 1
      return (
        <table className='table-left' >
          <tbody>
    
       
            <tr>
              <th>Nom du document </th>
              <th>Responsable du suivi de la mise à jour </th>
              <th>Règles de diffusion</th>
              <th>Elimination des périmés</th>
            
              <th><span onClick={() => todelete(temp.idelement)} className="material-symbols-outlined point outred">close</span></th>
            </tr>
            
            {performance10.map((value, index) => {
          
            
             

              finalIndex = index

              return (
                <tr>
                    <td>

                <textarea onChange={(e) => { tablo10[index].NomD=  e.target.value; console.log(tablo10) ; }} defaultValue={value.NomD}></textarea>
</td>
                  <td>

                    <textarea onChange={(e) => {  tablo10[index].Respo= e.target.value;  ; }} defaultValue={value.Respo}></textarea>
                  </td>
                  <td>
                    <textarea onChange={(e) => {  tablo10[index].Regle= e.target.value;   }} defaultValue={value.Regle}></textarea>


                  </td>
                  <td>
                    <textarea onChange={(e) => {  tablo10[index].Elimination= e.target.value;   }} defaultValue={value.Elimination}></textarea>


                  </td>
              
                 
                





                  <td>

                    <span onClick={() => rowok10(index)} className="material-symbols-outlined point">done</span>
                    <span onClick={() => rowdelete(index)} class="material-symbols-outlined point">close</span>

                  </td>

                </tr>
              )
            })}
            {/* {data1[weird+'+table'] = tablo} */}



          </tbody>
          <button onClick={() => { smart10() }}>Add</button>
        </table>
      )



    }
    if (temp.type === 'table11' && props.well === "MDI") {
      data4[ee + '+table11'] = temp.contenue
      let weird = ee;
      ee = ee + 1
      return (
        <table className='table-left' >
          <tbody>
    
       
            <tr>
              <th>Nom du Documentt </th>
              <th>Version du Document </th>
              <th>Rédacteur</th>
              <th> Validation</th>
              <th> Approbateur</th>
              <th>Règles de diffusion</th>
              <th>Elimination des périmés</th>


            
              <th><span onClick={() => todelete(temp.idelement)} className="material-symbols-outlined point outred">close</span></th>
            </tr>
            
            {performance11.map((value, index) => {
          
            
             

              finalIndex = index

              return (
                <tr>
                    <td>

                <textarea onChange={(e) => { tablo11[index].Ndocument =e.target.value; }} defaultValue={value.Ndocument}></textarea>
</td>
<td>

<textarea onChange={(e) => { tablo11[index].Vdocument =e.target.value; }} defaultValue={value.Vdocument}></textarea>
</td>
                  <td>

                    <textarea onChange={(e) => {  tablo11[index].Redacteur= e.target.value;  ; }} defaultValue={value.Redacteur}></textarea>
                  </td>
                  <td>
                    <textarea onChange={(e) => {  tablo11[index].Validation= e.target.value;   }} defaultValue={value.Validation}></textarea>


                  </td>
                  <td>
                    <textarea onChange={(e) => {  tablo11[index].Approbateur= e.target.value;   }} defaultValue={value.Approbateur}></textarea>


                  </td>
                  <td>
                    <textarea onChange={(e) => {  tablo11[index].Rdiffusion= e.target.value;   }} defaultValue={value.Rdiffusion}></textarea>


                  </td>
                  <td>
                    <textarea onChange={(e) => {  tablo11[index].Eprime= e.target.value;   }} defaultValue={value.Eprime}></textarea>


                  </td>
              
                 
                





                  <td>

                    <span onClick={() => rowok11(index)} className="material-symbols-outlined point">done</span>
                    <span onClick={() => rowdelete(index)} class="material-symbols-outlined point">close</span>

                  </td>

                </tr>

              )
            })}
            {/* {data1[weird+'+table'] = tablo} */}



          </tbody>
          <button onClick={() => { smart11() }}>Add</button>
        </table>
      )



    }


    if (temp.type === 'table12' && props.well === "MID") {
      data5[ee + '+table12'] = temp.contenue
      let weird = ee;
      ee = ee + 1
      return (
        <table className='table-left' >
          <tbody>
    
       
            <tr>
              <th>Nom du Documentt </th>
              <th>Identification </th>
              <th>Responsable d’émission</th>
              <th colSpan={2}>Regle de stockage </th>
              <th >Protection et accès</th>
              <th colSpan={2}>Règles d’archivage   </th>
            </tr>
            <tr>
              <th>

              </th>
              <th>
                
              </th>
              <th>
                
                </th>
             
              <th> Stockage Qui/où/comment</th>
              <th> Durée de conservation</th>
              <th></th>
              <th>Archivage Qui/où/comment</th>
              <th>Durée</th>


            
              <th><span onClick={() => todelete(temp.idelement)} className="material-symbols-outlined point outred">close</span></th>
            </tr>
            
            {performance12.map((value, index) => {
          
            
             

              finalIndex = index

              return (
                <tr>
                    <td>
{/*    tablo12[index].Ndocument = item.Ndocument;
                tablo12[index].Identification= item.Identification;
                tablo12[index].Respo = item.Respo;
                tablo12[index].Stockage = item.Stockage;
                tablo12[index].Dure= item.Dure;
                tablo12[index].Prot = item.Prot;
                tablo12[index].Arch = item.Arc;
                tablo12[index].dure = item.dure; */}
                <textarea onChange={(e) => { tablo12[index].Ndocument =e.target.value; }} defaultValue={value.Ndocument}></textarea>
</td>
<td>

<textarea onChange={(e) => { tablo12[index].Identification =e.target.value; }} defaultValue={value.Identification}></textarea>
</td>
                  <td>

                    <textarea onChange={(e) => {  tablo12[index].Respo= e.target.value;  ; }} defaultValue={value.Respo}></textarea>
                  </td>
                  <td>
                    <textarea onChange={(e) => {  tablo12[index].Stockage= e.target.value;   }} defaultValue={value.Stockage}></textarea>


                  </td>
                  <td>
                    <textarea onChange={(e) => {  tablo12[index].Dure= e.target.value;   }} defaultValue={value.Dure}></textarea>


                  </td>
                  <td>
                    <textarea onChange={(e) => {  tablo12[index].Prot= e.target.value;   }} defaultValue={value.Prot}></textarea>


                  </td>
                  <td>
                    <textarea onChange={(e) => {  tablo12[index].Arch= e.target.value;   }} defaultValue={value.Arch}></textarea>


                  </td>
                  <td>
                    <textarea onChange={(e) => {  tablo12[index].duree= e.target.value;   }} defaultValue={value.duree}></textarea>


                  </td>
              
                 
                





                  <td>

                    <span onClick={() => rowok12(index)} className="material-symbols-outlined point">done</span>
                    <span onClick={() => rowdelete(index)} class="material-symbols-outlined point">close</span>

                  </td>

                </tr>

              )
            })}
            {/* {data1[weird+'+table'] = tablo} */}



          </tbody>
          <button onClick={() => { smart12() }}>Add</button>
        </table>
      )



    }

    if (temp.type === 'table13' && props.well === "SGN") {
      data5[ee + '+table13'] = temp.contenue
      let weird = ee;
      ee = ee + 1
      return (
        <table className='table-left' >
          <tbody>
    
       
            <tr>
              <th>Nom du Documentt </th>
              <th>Identification </th>
              <th>Responsable d’émission</th>
              <th colSpan={2}>Regle de stockage </th>
              <th >Protection et accès</th>
              <th colSpan={2}>Règles d’archivage   </th>
            </tr>
            <tr>
              <th>

              </th>
              <th>
                
              </th>
              <th>
                
                </th>
             
              <th> Stockage Qui/où/comment</th>
              <th> Durée de conservation</th>
              <th></th>
              <th>Archivage Qui/où/comment</th>
              <th>Durée</th>


            
              <th><span onClick={() => todelete(temp.idelement)} className="material-symbols-outlined point outred">close</span></th>
            </tr>
            
            {performance13.map((value, index) => {
          
            
             

              finalIndex = index

              return (
                <tr>
                    <td>
{/*    tablo12[index].Ndocument = item.Ndocument;
                tablo12[index].Identification= item.Identification;
                tablo12[index].Respo = item.Respo;
                tablo12[index].Stockage = item.Stockage;
                tablo12[index].Dure= item.Dure;
                tablo12[index].Prot = item.Prot;
                tablo12[index].Arch = item.Arc;
                tablo12[index].dure = item.dure; */}
                <textarea onChange={(e) => { tablo13[index].quoi =e.target.value; }} defaultValue={value.quoi}></textarea>
</td>
<td>

<textarea onChange={(e) => { tablo13[index].qui =e.target.value; }} defaultValue={value.qui}></textarea>
</td>
                  <td>

                    <textarea onChange={(e) => {  tablo13[index].activite= e.target.value;  ; }} defaultValue={value.activite}></textarea>
                  </td>
                  <td>
                    <textarea onChange={(e) => {  tablo13[index].dsm= e.target.value;   }} defaultValue={value.dsm}></textarea>


                  </td>
                  <td>
                    <textarea onChange={(e) => {  tablo13[index].element= e.target.value;   }} defaultValue={value.element}></textarea>


                  </td>
                  <td>
                    <textarea onChange={(e) => {  tablo13[index].quand= e.target.value;   }} defaultValue={value.quand}></textarea>


                  </td>
                  <td>
                    <textarea onChange={(e) => {  tablo13[index].critere= e.target.value;   }} defaultValue={value.critere}></textarea>


                  </td>
                  <td>
                    <textarea onChange={(e) => {  tablo13[index].info= e.target.value;   }} defaultValue={value.info}></textarea>


                  </td>
                  <td>
                    <textarea onChange={(e) => {  tablo13[index].quoi2= e.target.value;   }} defaultValue={value.quoi2  }></textarea>


                  </td>
                  <td>
                    <textarea onChange={(e) => {  tablo13[index].qui2= e.target.value;   }} defaultValue={value.qui2}></textarea>


                  </td>
                  <td>
                    <textarea onChange={(e) => {  tablo13[index].type= e.target.value;   }} defaultValue={value.type}></textarea>


                  </td>
                  <td>
                    <textarea onChange={(e) => {  tablo13[index].quand2= e.target.value;   }} defaultValue={value.quand2}></textarea>


                  </td>
                  <td>
                    <textarea onChange={(e) => {  tablo13[index].comment= e.target.value;   }} defaultValue={value.comment}></textarea>


                  </td>
              
                 
                





                  <td>

                    <span onClick={() => rowok13(index)} className="material-symbols-outlined point">done</span>
                    <span onClick={() => rowdelete(index)} class="material-symbols-outlined point">close</span>

                  </td>

                </tr>

              )
            })}
            {/* {data1[weird+'+table'] = tablo} */}



          </tbody>
          <button onClick={() => { smart13() }}>Add</button>
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
        axios.get("http://localhost:3002/api/getperformance8", { params: { 'id': userid } }).then()


        setData2({})
      })
    }
    if (props.well == "MDE") {
      axios.post("http://localhost:3002/api/updateallpage10", { 'data1': data3, 'user': userid }).then((response) => {
        axios.get("http://localhost:3002/api/getperformance10", { params: { 'id': userid } }).then()
   


        setData3({})
      })
    }
    if (props.well == "MDI") {
      axios.post("http://localhost:3002/api/updateallpage11", { 'data1': data4, 'user': userid }).then((response) => {
        axios.get("http://localhost:3002/api/getperformance11", { params: { 'id': userid } }).then()
   


        setData4({})
      })
    }
    if (props.well == "MID") {
      axios.post("http://localhost:3002/api/updateallpage12", { 'data1': data5, 'user': userid }).then((response) => {
        axios.get("http://localhost:3002/api/getperformance12", { params: { 'id': userid } }).then()
   


        setData5({})
      })
    }
    if (props.well == "SGN") {
      axios.post("http://localhost:3002/api/updateallpage13", { 'data1': data5, 'user': userid }).then((response) => {
        axios.get("http://localhost:3002/api/getperformance13", { params: { 'id': userid } }).then()
   


        setData6({})
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