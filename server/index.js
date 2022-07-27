const express=require('express');
const bcrypt = require ('bcrypt')
var mysql = require('mysql');
var cors=require('cors');
const app=express();
app.use(cors());
app.use(express.json());
var bodyParser = require('body-parser');
const secret_key = 'please_store_secret_in_your_environment_file';  
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
var formidable = require('formidable');
const multer=require('multer');
const path = require("path")
const { query } = require('express');
const util=require('util');
var os = require('os');
var fs=require('fs')

// middlewares
// app.use(bodyParser);
app.use(cookieParser());

const db = mysql.createConnection({

    host: "localhost",
 
    user: "root",
 
    password: "password",

    database:"ramadmin"
 
  });
const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'public')
  },
  filename:(req,file,cb)=>{
    cb(null,Date.now()+'-'+file.originalname)
  }
})
const upload=multer({storage}).single('file')
db.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
  });

// input dyal api-auth
app.post("/api/login",(req,res)=>{

    let password=req.body.password;

    let username=req.body.username;
   
    db.query(
      "select id from users where email=? and password=? ",
      [username,password],
      (err,result)=>{
     
      if(err){
        
        console.log({err:err})
      }
      if(!result[0]){res.send({message:"Wrong username/password"})
      console.log({message:"Wrong username/password"})}
      
      else{
        const user={id:result[0].id}
        const token = jwt.sign(
          { user },
          "my_secret_key");
        res.json({
          token:token,
          result:result
        });
        
      }
     
      
      
})
}) 
app.post("/api/addUser",(req,res)=>{
  // jwt.verify(req.body.answer,'my_secret_key',function(err,data){
  //   if(err){
  //     res.sendStatus(403);
  //   }else{

  let password=req.body.password;
  let username=req.body.username;
  let nom=req.body.nom;
  let prenom=req.body.prenom;
  let statut=req.body.statut;



    db.query(
      "insert into users(email,password,nom,prenom,statut) values(?,?,?,?,?)",
      [username,password,nom,prenom,statut],
      (err,result)=>{
      console.log("this")
      if(err){
        
        console.log({err:err})
        res.send(err)
      }
      res.send(result)
      // http://localhost:3002/api/addUser
  
  })
    
   }
   )
   
   
  


// }

// }) 
app.post("/api/modifyUser",(req,res)=>{
  // jwt.verify(req.body.answer,'my_secret_key',function(err,data){
  //   if(err){
  //     res.sendStatus(403);
  //   }else{

  let id=req.body.id
  let password=req.body.password;
  let username=req.body.username;
  let nom=req.body.nom;
  let prenom=req.body.prenom;
  let statut=req.body.statut;



  db.query("update users set email=? , password=? , nom=? , prenom=? ,statut=? where id=?",[username,password,nom,prenom,statut,id],(err,result)=>{
    if(!err) return res.send(result)
    res.send(err)
  }
)})
    
   
   

app.post("/api/delete",(req,res)=>{
  // jwt.verify(req.body.answer,'my_secret_key',function(err,data){
  //   if(err){
  //     res.sendStatus(403);
  //   }else{
    
    let id=req.body.id;
   
    db.query(
    "delete from users where id=?",
    [id],
    (err,result)=>{
   
    if(err){
      
      console.log({err:err})
    }
    res.send(result)
  
  
  

}) }
// }
)
// })



app.get("/api/get",(req,res)=>{
    // jwt.verify(req.query.answer,'my_secret_key',function(err,data){
    //   if(err){
    //     res.sendStatus(403);
    //   }else{
        const sqlquery="select * from users;";
        db.query(sqlquery,(err,result)=>(
        res.send(result)))
      }
    // }
    )
    app.get("/api/getoption",(req,res)=>{
      // jwt.verify(req.query.answer,'my_secret_key',function(err,data){
      //   if(err){
      //     res.sendStatus(403);
      //   }else{
          const sqlquery="select * from users where statut=1";
          db.query(sqlquery,(err,result)=>(
          res.send(result)))
        }
      // }
      )
    app.get("/api/getrow",(req,res)=>{
      // jwt.verify(req.query.answer,'my_secret_key',function(err,data){
      //   if(err){
      //     res.sendStatus(403);
      //   }else{
        let id=req.query.id
          const sqlquery="select * from users where id=?;";
          db.query(sqlquery,[id],(err,result)=>(
          res.send(result)))
        }
      // }
      )
     
      
    
  
    // })
  app.post("/api/Yadmin",(req,res)=>{
    // jwt.verify(req.body.answer,'my_secret_key',function(err,data){
    //   if(err){
    //     res.sendStatus(403);
    //   }else{
      let id=req.body.id;
        db.query(
        "update users set statut=1 where id=?",
        [id],
        (err,result)=>{
       
        if(err){
          
          console.log({err:err})
        }
        res.send(result)
      
      
    
    }) 
    // }
  })
// })
    app.post("/api/Nadmin",(req,res)=>{
      // jwt.verify(req.body.answer,'my_secret_key',function(err,data){
      //   if(err){
      //     res.sendStatus(403);
      //   }else{
      let id=req.body.id;
      
        db.query(
        "update users set statut=0 where id=?",[id],
       
        (err,result)=>{
          
        if(err){
          
          console.log({err:err})
        }
        res.send(result)
      
    
    }) 
    }
  // }
  )
// }) 

// main
// getting processus
app.get("/api/getproc",(req,res)=>{
  jwt.verify(req.query.answer,'my_secret_key',function(err,data){
   
    if(err){
      res.sendStatus(403);
    }else{
  const sqlquery="select * from dossier where id_doss is null;";
  db.query(sqlquery,(err,result)=>(
  res.send(result))) 
}
})})
// api/getprocdosdad
app.post("/api/getprocdos",(req,res)=>{
  jwt.verify(req.body.answer,'my_secret_key',function(err,data){
   
    if(err){
      res.sendStatus(403);
    }else{
  let id=req.body.id;
  if(id){
  const sqlquery="select * from dossier where id_doss=?";
  db.query(sqlquery,[id],(err,result)=>{
 
  res.send(result)})}
  else{
    const sqlquery="select * from dossier where id_doss is ?";
    db.query(sqlquery,[id],(err,result)=>{
 
    res.send(result)})
  }
}
})})
// ajouté libellé
app.post("/api/addproc",(req,res)=>{
  jwt.verify(req.body.answer,'my_secret_key',function(err,data){
    if(err){
      res.sendStatus(403);
    }else{
  let proc=req.body.processus;
  let id=req.body.id;
  
  db.query(
    "insert into dossier(libellé,id_doss) values(?,?)",
    [proc,id],
    
    (err,result)=>{
   
    if(err){
      
      console.log({err:err})
      res.send(err)
    }
    res.send(result)
    // http://localhost:3002/api/addUser

})
}})})
app.post("/api/procdelete",(req,res)=>{
  jwt.verify(req.body.answer,'my_secret_key',function(err,data){
    if(err){
      res.sendStatus(403);
    }else{
    let id=req.body.id;
    db.query(
    "delete from dossier where id_processus=?",
    [id],
    (err,result)=>{
   
    if(err){
      
      console.log({err:err})
    }
    res.send(result)
  
  
  

}) }
})})

app.post("/api/fichiers",(req,res)=>{
  
  jwt.verify(req.body.answer,'my_secret_key',function(err,data){
    if(err){
      res.sendStatus(403);
    }else{
  let id=req.body.id;

  db.query(
  "select * from fichier where id_processus=?",
  [id],
  (err,result)=>{
 
  if(err){
    
    console.log({err:err})
  }
  res.send(result)
 




}) }
})})
app.post("/api/getlibelle",(req,res)=>{
  
  jwt.verify(req.body.answer,'my_secret_key',function(err,data){
    if(err){
      res.sendStatus(403);
    }else{
  let id=req.body.id;

  db.query(
  "select libellé from dossier where id_processus=?",
  [id],
  (err,result)=>{
 
  if(err){
    
    console.log({err:err})
  }
  res.send(result)
 




}) }
})})
// api upload
app.post("/api/upload",(req,res)=>{


  upload(req,res,(err)=>{
    if(err){
     
    return res.status(500).json(err)}
    else{
      let name=req.file.filename;
      let id=req.body.id
      if(id=='null'){
    db.query('insert into fichier(libellé,id_processus) values(?,null)',[name],
      (err,result)=>{
     
      if(err){
        
        console.log({err:err})
      }
      res.send(result) })
    }
    else{
      db.query('insert into fichier(libellé,id_processus) values(?,?)',[name,id],
      (err,result)=>{
     
      if(err){
        
        console.log({err:err})
      }
      res.send(result) })
    }
    
    }
     
  })

});

app.post("/api/getfile",(req,res)=>{
 
  let id=req.body.id
  if (id){
  db.query("select * from fichier where id_processus=?",[id],(err,result)=>{
    if(!err) return res.send(result)
    res.send(err)
  })}
  else{db.query("select * from fichier where id_processus is ?",[id],(err,result)=>{
    if(!err) return res.send(result)
    res.send(err)
  })}}
)
app.get("/api/getfileid",(req,res)=>{
  db.query("select id_processus from fichier ",(err,result)=>{
    if(!err) return res.send(result)
    res.send(err)
  })
})
app.get('/api/download', function(req, res){
  let name=req.query.filename
  const file = `${__dirname}/public/${name}`;
  

 

  
 


  res.download(file); // Set disposition and send it.
  
});
app.get("/api/get",(req,res)=>{
  jwt.verify(req.query.answer,'my_secret_key',function(err,data){
    if(err){
      res.sendStatus(403);
    }else{
      const sqlquery="select * from users;";
      db.query(sqlquery,(err,result)=>(
      res.send(result)))
    }
  })
  })
  
  app.post("/api/filedelete",(req,res)=>{
    
    let id=req.body.id;

    db.query(
      "select libellé from fichier where id_fichier=?",
      [id],
      (err,result)=>{
        try {
          console.log(result)
          fs.unlinkSync(`${__dirname}/public/${result[0].libellé}`)
          //file removed
        } catch(err) {
          console.error(err)
        }
  


    //   }
    //  )
    })



    db.query(
    "delete from fichier where id_fichier=?",
    [id],
    (err,result)=>{
   
    if(err){
      
      console.log({err:err})
    }
    res.send(result)
  })
   
// try {
//   fs.unlinkSync(path)
//   //file removed
// } catch(err) {
//   console.error(err)
// }
  
  
  

}) 

// /api/userproc
app.get('/api/userproc',(req,res)=>{
  let id=req.query.userid
  db.query('select id_processus from users where id = ?',[id],(err,result)=>{res.send(result)})
})
app.get('/api/isadmin',(req,res)=>{
  let id=req.query.userid
  db.query('select statut from users where id = ?',[id],(err,result)=>{res.send(result)})
})
app.get('/api/processusget',(req,res)=>{
  let id=req.query.id_user
  db.query('select * from processus p,users u where u.id=p.id_user ',(err,result)=>{
    // db.query('select concat(nom," ",prenom) as "come" from users where id = ?',[id],(err,result)=>{console.log(result);res.json({"one":result1,"two":result})})
    if(err) console.log(err)
    res.send(result)
  })
})
// /api/processusmodif

app.get('/api/processusgettemp',(req,res)=>{
  let id=req.query.id_proc
  db.query('select * from processus p,users u where u.id=p.id_user and id_proc=?',[id],(err,result)=>{
    // db.query('select concat(nom," ",prenom) as "come" from users where id = ?',[id],(err,result)=>{console.log(result);res.json({"one":result1,"two":result})})
    if(err) console.log(err)
    res.send(result)
  })
})
app.post("/api/addprocessus",(req,res)=>{
 
  let id_proc=req.body.id_proc
  let titre=req.body.titre
  let desc=req.body.desc
  let pilote=req.body.pilote

  db.query("insert into processus(id_proc,titre,description,id_user) values(?,?,?,?)",[id_proc,titre,desc,pilote],(err,result)=>{
    if(!err) return res.send(result)
    res.send(err)
  }
  )})
  app.post("/api/modifyprocessus",(req,res)=>{
 
    let id_proc=req.body.id_proc
    let titre=req.body.titre
    let desc=req.body.desc
    let pilote=req.body.pilote
  
    db.query("update processus set titre=? , Description=? , id_user=? where id_proc=?",[titre,desc,pilote,id_proc],(err,result)=>{
      if(!err) return res.send(result)
      res.send(err)
    }
    )})
  // /api/processusdelete
  app.post("/api/processusdelete",(req,res)=>{
 
    let id_proc=req.body.id_proc
  
  
    db.query("delete from processus where id_proc=?",[id_proc],(err,result)=>{
      if(!err) return res.send(result)
      res.send(err)
    }
    )})

    app.get('/api/processusgetuser',(req,res)=>{
     
      let id=req.query.id_user

      db.query('select concat(nom," ",prenom) as "come" from users where id = ?',[id],(err,result)=>{res.send(result)})
    })
  app.post("/api/statut",(req,res)=>{
     
      let id=req.body.id
    
      db.query("select statut from users where id = ?",[id],(err,result)=>{
        if(!err) return res.send(result)
        res.send(err)
      }
      )})
      app.get("/api/statut",(req,res)=>{
     
        let id=req.query.id
      
        db.query("select statut from users where id = ?",[id],(err,result)=>{
          if(!err) return res.send(result)
          res.send(err)
        }
        )})

app.listen(3002,()=>{
    console.log("running on 3002")
}
)



  

