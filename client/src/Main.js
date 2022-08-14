import { useParams, Redirect, useNavigate } from "react-router-dom"
import { useEffect, useState, createContext } from 'react'
import Header from './Header'
import Axios from 'axios';
import Imgdoss from './img/folder.png'
import Imgfile from './img/file.png'
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Imgform from './img/formulaire.png'

export default function Main(props) {

    let history = useHistory();
    let [row, setRow] = useState([]);
    let [inputproc, setInputproc] = useState('')
    let [tempo, setTempo] = useState(true)
    let [idd, setIdd] = useState(null)
    let [yikes, setYikes] = useState([])
    let [hist, setHist] = useState([])
    let [source, setSource] = useState([""])
    const [isLoading, setIsLoading] = useState(false);
    let [file, setFile] = useState(null)
    let [fichierow, setFichierow] = useState([])
    let [fileid, setFileid] = useState([])
    let [transfolder, setTransfolder] = useState(false)
    let [transfolder1, setTransfolder1] = useState(false)
    let [transfile, setTransfile] = useState(false)
    let { userid } = useParams();
    let [userproc, setUserproc] = useState();
    let [isadmin, setIsadmin] = useState();
    let [boolfich, setBoolFich] = useState(false)
    let [entrance, setEntrance] = useState();
    let [isObservant, setIsObservant] = useState(false);
    let [responsi, setResponsi] = useState();
    let [form, setForm] = useState([]);
    let [ownerId, setOwnerId] = useState()
    function addproc(id) {
        setIsLoading(true);

        if (id == null) {
            Axios.post('http://localhost:3002/api/addproc', {

                "processus": inputproc,
                "id": id,
                answer: window.token


            }).then((response) => {
                if (!response.data.message) {



                    Axios.get("http://localhost:3002/api/getproc", { params: { answer: window.token } }).then((response) => { setTransfolder(false); setIsLoading(false); setRow(response.data) })


                }


            })
        }
        else {
            Axios.post('http://localhost:3002/api/addproc', {

                "processus": inputproc,
                "id": id,
                answer: window.token

            }).then((response) => {
                if (!response.data.message) {


                    setIsLoading(false);
                    Axios.post("http://localhost:3002/api/getprocdos", { "id": id, "answer": window.token }).then((response) => { setTransfolder(false); setRow(response.data) })


                }


            })
        }
    }
    function toform(temp){
        
        history.push(`/${temp.replace(/\s+/g, '')}/${ownerId}`);

    }
    function back() {
        setIsLoading(true);
        axios.post("http://localhost:3002/api/getfile", { id: idd, answer: window.token }).then((response) => { setFichierow(response.data) })
        Axios.post("http://localhost:3002/api/getprocdos", { "id": hist[hist.length - 1], answer: window.token })
            .then((response) => { setIdd(hist[hist.length - 1]); setSource(source.slice(0, -2)); setHist(hist.slice(0, -1)); setIsLoading(false);; setRow(response.data) })



        axios.get("http://localhost:3002/api/getdoss", { params: { "id": idd, answer: window.token } }).then((response) => { if (response.data[0].id_user == idd) { setBoolFich(true) } else { setBoolFich(false) }; setOwnerId(response.data[0].id_user) })
        axios.get("http://localhost:3002/api/getform",{params:{"id": hist[hist.length - 1]}}).then((response)=>setForm(response.data))










    }

    function handleClickDelete(event, idtodelete) {
        setIsLoading(true);
        if (idd == null) {
            Axios.post("http://localhost:3002/api/procdelete1", { "id": idtodelete, answer: window.token }).then(() => {

                Axios.get("http://localhost:3002/api/getproc", { params: { answer: window.token } }).then((response) => { setIsLoading(false); setRow(response.data) })


            }


            )
        }
        else {
            Axios.post("http://localhost:3002/api/procdelete1", { "id": idtodelete, answer: window.token }).then(() => {
                Axios.post("http://localhost:3002/api/getprocdos", { "id": idd, answer: window.token }).then((response) => { setIsLoading(false); setRow(response.data) })

            })
        }
    }


    function handleClickDeleteForm(event, idtodelete) {
        setIsLoading(true);
      
        console.log(idtodelete);

            
        
     
            Axios.post("http://localhost:3002/api/Formdelete1", { "id": idtodelete, answer: window.token }).then(() => {
                Axios.post("http://localhost:3002/api/getprocdos", { "id": idd, answer: window.token }).then((response) => { setIsLoading(false); setRow(response.data) })
                axios.get("http://localhost:3002/api/getform",{params:{"id": idd}}).then((response)=>setForm(response.data))
            })
        }
    
    function tofichier(currentid, x) {
        setIsLoading(true);
        setIdd(currentid)

        // axios.get("http://localhost:3002/api/getdoss", { params: { "id": idd, answer: window.token } }).then((response) => {  setOwnerId(response.data[0].id_user) })
        Axios.post("http://localhost:3002/api/getlibelle", { "id": currentid, answer: window.token }).then((response) => { setSource([...source, response.data[0].libellé, ' / ']) })
        setHist([...hist, x]);
        Axios.post("http://localhost:3002/api/getprocdos", { "id": currentid, "parentid": x, answer: window.token }).then((response) => { setIsLoading(false); setRow(response.data) })
        axios.post("http://localhost:3002/api/getfile", { id: idd, answer: window.token }).then((response) => { setFichierow(response.data) })
        axios.get("http://localhost:3002/api/getdoss", { params: { "id": currentid, answer: window.token } }).then((response) => {
            if(idd == null) {setOwnerId(response.data[0].id_user);console.log(response.data[0].id_user)}
             if (response.data[0].id_user == userid) { setBoolFich(true) };})
        axios.get("http://localhost:3002/api/getform",{params:{"id": currentid}}).then((response)=>setForm(response.data))
    }
    function handleClickDeleteFile(event, idtodelete) {
        // setIsLoading(true);
        setIsLoading(true)

        Axios.post("http://localhost:3002/api/filedelete", { "id": idtodelete, answer: window.token }).then(() => {
            axios.post("http://localhost:3002/api/getfile", { id: idd, answer: window.token }).then((response) => { setIsLoading(false); setFichierow(response.data) })

        })
    }



    function sendusers() {
        history.push(`/Users/${userid}`);
    }
    function handleEdit(idproc, xd) {


        axios.get('http://localhost:3002/api/editdoss', { params: { 'lib': xd, "id": idproc, answer: window.token } }).then(
            Axios.post("http://localhost:3002/api/getprocdos", { "id": idd, answer: window.token }).then((response) => { setIsLoading(false); setRow(response.data) })

        )
    }

    useEffect(() => { console.log(hist) }, [hist])
    useEffect(() => { condition() }, [idd])
    useEffect(() => { console.log(source) }, [source])
    useEffect(() => { console.log('ROCK AND ROLL') }, [userproc])
    useEffect(() => {
        setIsLoading(true);
        Axios.get("http://localhost:3002/api/getproc", { params: { answer: window.token } }).then((response) => { setIsLoading(false); setRow(response.data) })
        axios.get('http://localhost:3002/api/userproc', { params: { userid: userid, answer: window.token } }).then((response) => { setUserproc(response.data[0].id_processus) })
        // axios.get('http://localhost:3002/api/isadmin',{params:{userid:userid}}).then((response)=>{response.data[0].statut==0 ? setIsadmin(false) : setIsadmin(true)})
        axios.get('http://localhost:3002/api/statut', { params: { "id": userid, answer: window.token } }).then((response) => {

            if (response.data[0].statut == 0) setIsObservant(true)

        }
        )
        //Runs on every render
    }, []);
    useEffect(() => {
        axios.post("http://localhost:3002/api/getfile", { id: idd, answer: window.token }).then((response) => { setFichierow(response.data) })
    }, [idd])
    useEffect(() => { console.log(userproc) }, [userproc])

    if (!props.authorized) {
        return <Redirect to="/" />
    }

    function onInputChange(e) {
        setFile(e.target.files[0])
    }
    const onSubmit = (e) => {
        setIsLoading(true)
        e.preventDefault();
        const data = new FormData();
        data.append('file', file)
        data.append('id', idd)
        data.append('answer', window.token)
        axios.post('http://localhost:3002/api/upload', data).then((e) => {
            toast.success('Envoie terminé');
            setIsLoading(false)
            axios.post("http://localhost:3002/api/getfile", { id: idd, answer: window.token }).then((response) => { setTransfile(false); setFichierow(response.data) })
        })
            .catch((e) => {
                toast.error('Echec');
                console.error('Error', e)
            })
    }
    const condition = () => {
        if (idd != null && idd == userproc) {
            setEntrance(idd)


        }
    }



    let temp = idd != null && idd == userproc;
    var today = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    function download(name) {
        window.open(`http://localhost:3002/api/download?filename=${name}&token=${window.token}`, '_blank');
        axios.get('http://localhost:3002/api/download', { params: { filename: name, answer: window.token } }).then(() => { })
    }
    function transition() {
        setTransfolder(true)
    }
    return (
        <>
            <Header />
            <h4 className="source">{source} </h4>
            {/* {isadmin &&  <span onClick={sendusers} class="material-symbols-outlined send--users point">
manage_accounts
</span>} */}


            <div className="main--container">

                <div className="flexcenter1"><div>{(boolfich && isObservant == false) && <span class="material-symbols-outlined two" onClick={transition}>create_new_folder</span>}{(boolfich && isObservant == false) && <span onClick={() => setTransfile(true)} class="material-symbols-outlined two">
                    file_upload
                </span>}</div>
                    <h3 className="time"> {today.toLocaleDateString("fr-FR", options)}</h3>
                </div>

                {row.map((temp) => (<div className="aligncenter stop well " > <div className="flexi" ><img src={Imgdoss} width="30px"></img>   <div className=" pad aha point" onClick={() => (tofichier(temp.id_processus, temp.id_doss))} >{temp.libellé}</div></div>{(boolfich && isObservant == false) && <><span class="material-symbols-outlined point" onClick={() => { console.log("xd"); setResponsi(temp.id_processus); setTransfolder1(true) }}>edit</span><div onClick={event => handleClickDelete(event, temp.id_processus)}><span class="material-symbols-outlined point ">
                    delete
                </span></div></>}</div>))}
                {fichierow.map((temp) => ((<div className="flexi1"> <div className="flexi"><img src={Imgfile} width="30px"></img>  <div className=" ">{temp.libellé.substring(temp.libellé.indexOf("-") + 1)}</div></div><div className="flexi"><div onClick={() => (download(temp.libellé))} class="material-symbols-outlined point ">
                    download
                </div>{(boolfich && isObservant == false) && <><div onClick={event => handleClickDeleteFile(event, temp.id_fichier)}><span class="material-symbols-outlined point ">
                    delete
                </span></div></>}</div></div>)))}

                {/* formulaire */}
                {form.map((temp) => (<div className="aligncenter stop well " > <div className="flexi" ><img src={Imgform} width="30px"></img>   <div className=" pad aha point"  onClick={()=>toform(temp.Nom)}>{temp.Nom}</div></div>{(boolfich && isObservant == false) && <><span class="material-symbols-outlined point" onClick={() => { console.log("xd"); setResponsi(temp.id_processus); setTransfolder1(true) }}>edit</span><div onClick={event => handleClickDeleteForm(event,temp.idlist_form)}><span class="material-symbols-outlined point ">
                    delete
                </span></div></>}</div>))}
                

            </div>

            {/* <button onClick="addproc" className="auth--submit centerbutton">Ajouter un processus</button> */}

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

                </>}

            {transfile &&
                <>

                    <div className="graybackground"></div>
                    <span onClick={() => setTransfile(false)} class="material-symbols-outlined quit">
                        cancel
                    </span>
                    <div class="col-md-6">

                        <form method="post" action="#" id="#" onSubmit={onSubmit}>
                            <div class="form-group files">
                                <input class="form-control" type="file" onChange={onInputChange} multiple="" required />
                                <button >submit </button>
                            </div>
                        </form>
                    </div></>}
            {(idd != null) && <span onClick={back} className=" arrow point">&#10229;</span>}

            {transfolder && <>
                <div className="graybackground"></div>
                <span onClick={() => setTransfolder(false)} class="material-symbols-outlined quit1">
                    cancel
                </span>
                <div className="center--form">
                    <h3 className="lib">libellé</h3>
                    <input className="auth--input" type="text" onChange={(e) => { setInputproc(e.target.value) }}></input>
                    <button type="button" onClick={() => addproc(idd)} className="auth--submit point">Confirmer</button>
                </div></>}


            {transfolder1 && <>
                <div className="graybackground"></div>
                <span onClick={() => setTransfolder1(false)} class="material-symbols-outlined quit1">
                    cancel
                </span>
                <div className="center--form">
                    <h3 className="lib">libellé</h3>
                    <input className="auth--input" type="text" onChange={(e) => { setInputproc(e.target.value) }}></input>
                    <button type="button" onClick={() => { handleEdit(responsi, inputproc); setTransfolder1(false) }} className="auth--submit point">Confirmer</button>
                </div></>}
        </>)
}

