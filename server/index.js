const express = require('express');
const bcrypt = require('bcrypt')
var mysql = require('mysql');
var cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
var bodyParser = require('body-parser');
const secret_key = 'please_store_secret_in_your_environment_file';
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
var formidable = require('formidable');
const multer = require('multer');
const path = require("path")
const { query, application } = require('express');
const util = require('util');
var os = require('os');
var fs = require('fs');
const { abort, send } = require('process');

// middlewares
// app.use(bodyParser);
app.use(cookieParser());

const db = mysql.createConnection({

  host: "localhost",

  user: "root",

  password: "password",

  database: "ramadmin"

});
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
const upload = multer({ storage }).single('file')
db.connect(function (err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});

// input dyal api-auth
app.post("/api/login", (req, res) => {


  let password = req.body.password;

  let username = req.body.username;

  db.query(
    "select id from users where email=? and password=? ",
    [username, password],
    (err, result) => {

      if (err) {

        console.log({ err: err })
      }
      if (!result[0]) {
        res.send({ message: "Wrong username/password" })
        console.log({ message: "Wrong username/password" })
      }

      else {

        const user = { id: result[0].id }
        const token = jwt.sign(
          { user },
          "my_secret_key");
        res.json({
          token: token,
          result: result
        });


      }



    })
})
app.post("/api/addUser", (req, res) => {
  jwt.verify(req.body.answer, 'my_secret_key', function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else {

      let password = req.body.password;
      let username = req.body.username;
      let nom = req.body.nom;
      let prenom = req.body.prenom;
      let statut = req.body.statut;



      db.query(
        "insert into users(email,password,nom,prenom,statut) values(?,?,?,?,?)",
        [username, password, nom, prenom, statut],
        (err, result) => {
          console.log("this")
          if (err) {


          }
          db.query("select id from users where email = ? and password = ?", [username, password], (err, result) => {
            db.query("insert into ciprocessus(type,contenue,user_id) values('input','rôle du processus :',?),('textarea',null,?),('halflib','Entrée',?),('halflib','Sorties',?),('halfinput',null,?),('halfinput',null,?),('halflib','Acteurs',?),('halflib','Ressources Essentiels',?),('halfinput',null,?),('halfinput',null,?),('input','Principaux documents et données associées',?),('thirdlib','Documents internes',?),('thirdlib','Documents externes',?),('thirdlib','Enregistrements',?),('thirdinput',null,?),('thirdinput',null,?),('thirdinput',null,?),('input','Méthodes de surveillance et messure de processus',?),('textarea','Revue Processus             : 1 par an et à la demande Audit interne qualité       : 1 par an et à la demande Enquête de satisfaction   : 20 par an et à la demande processus de réalisation.',?),('input','Indicateur Performance :',?),('table',null,?)", [result[0].id, result[0].id, result[0].id, result[0].id, result[0].id, result[0].id, result[0].id, result[0].id, result[0].id, result[0].id, result[0].id, result[0].id, result[0].id, result[0].id, result[0].id, result[0].id, result[0].id, result[0].id, result[0].id, result[0].id, result[0].id], (err, result) => {
              if (err) console.log(err)
              console.log(result)
            })
            db.query("insert into reprocessus(type,contenue,user_id,date) values('input','',?,NOW())", [result[0].id], (err, result) => {
              if (err) console.log(err)
              console.log(result)
            })
          })
          res.send(result)

          // http://localhost:3002/api/addUser

        })

    }
  })
})

//  /api/insertfirstable
app.post("/api/insertfirstable", (req, res) => {

  let nom = req.body.nom
  let def = req.body.def;
  let form = req.body.form;
  let Responsable = req.body.Responsable;
  let period = req.body.period;



  db.query("insert into  indi_performance(Nom_indicateur,Definition,Formule,Responsable_maj,Periodicite) values (?,?,?,?,?) ", [nom, def, form, Responsable, period], (err, result) => {
    if (!err) return res.send(result)
    res.send(err)
  }
  )
})




// }

// }) 
app.post("/api/modifyUser", (req, res) => {
  jwt.verify(req.body.answer, 'my_secret_key', function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else {

      let id = req.body.id
      let password = req.body.password;
      let username = req.body.username;
      let nom = req.body.nom;
      let prenom = req.body.prenom;
      let statut = req.body.statut;



      db.query("update users set email=? , password=? , nom=? , prenom=? ,statut=? where id=?", [username, password, nom, prenom, statut, id], (err, result) => {
        if (!err) return res.send(result)
        res.send(err)
      }
      )
    }
  })
})




app.post("/api/delete", (req, res) => {
  jwt.verify(req.body.answer, 'my_secret_key', function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else {

      let id = req.body.id;

      db.query(
        "delete from users where id=?",
        [id],
        (err, result) => {

          if (err) {

            console.log({ err: err })
          }
          res.send(result)




        })
    }
    // }
  })
})
// })



app.get("/api/get", (req, res) => {
  jwt.verify(req.query.answer, 'my_secret_key', function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      const sqlquery = "select * from users;";
      db.query(sqlquery, (err, result) => (
        res.send(result)))
    }
  }
  )
})
app.get("/api/getoption", (req, res) => {
  jwt.verify(req.query.answer, 'my_secret_key', function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      const sqlquery = "select * from users where statut=1";
      db.query(sqlquery, (err, result) => (
        res.send(result)))
    }
  }
  )
})
app.get("/api/getrow", (req, res) => {
  jwt.verify(req.query.answer, 'my_secret_key', function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      let id = req.query.id
      const sqlquery = "select * from users where id=?;";
      db.query(sqlquery, [id], (err, result) => (
        res.send(result)))
    }
  }
  )
})




// })
app.post("/api/Yadmin", (req, res) => {
  jwt.verify(req.body.answer, 'my_secret_key', function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      let id = req.body.id;
      db.query(
        "update users set statut=1 where id=?",
        [id],
        (err, result) => {

          if (err) {

            console.log({ err: err })
          }
          res.send(result)



        })
    }
  })
})
app.post("/api/Nadmin", (req, res) => {
  jwt.verify(req.body.answer, 'my_secret_key', function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      let id = req.body.id;

      db.query(
        "update users set statut=0 where id=?", [id],

        (err, result) => {

          if (err) {

            console.log({ err: err })
          }
          res.send(result)


        })
    }
  }
  )
})

// main
// getting processus
app.get("/api/getproc", (req, res) => {
  jwt.verify(req.query.answer, 'my_secret_key', function (err, data) {

    if (err) {
      res.sendStatus(403);
    } else {
      const sqlquery = "select * from dossier where id_doss is null and activated = 1;";
      db.query(sqlquery, (err, result) => (
        res.send(result)))
    }
  })
})
// api/getprocdosdad
app.post("/api/getprocdos", (req, res) => {
  jwt.verify(req.body.answer, 'my_secret_key', function (err, data) {

    if (err) {
      res.sendStatus(403);
    } else {
      let id = req.body.id;
      if (id) {
        const sqlquery = "select * from dossier where id_doss=? and activated = 1";
        db.query(sqlquery, [id], (err, result) => {

          res.send(result)
        })
      }
      else {
        const sqlquery = "select * from dossier where id_doss is ? and activated = 1";
        db.query(sqlquery, [id], (err, result) => {

          res.send(result)
        })
      }
    }
  })
})
// ajouté libellé
app.post("/api/addproc", (req, res) => {
  jwt.verify(req.body.answer, 'my_secret_key', function (err, data) {

    if (err) {
      res.sendStatus(403);
    } else {
      let proc = req.body.processus;
      let id = req.body.id;

      db.query(
        "insert into dossier(libellé,id_doss) values(?,?)",
        [proc, id],

        (err, result) => {

          if (err) {

            console.log({ err: err })
            res.send(err)
          }
          res.send(result)
          // http://localhost:3002/api/addUser

        })
    }
  })
})
app.post("/api/addprocname", (req, res) => {
  jwt.verify(req.body.answer, 'my_secret_key', function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      let id = req.body.id;

      db.query(
        'insert into dossier(libellé,id_doss) values("Dossier de base",?)',
        [id],

        (err, result) => {

          if (err) {

            console.log({ err: err })
            res.send(err)
          }
          db.query("select id_processus from dossier where libellé = 'Dossier de base' and id_doss = ?", [id], (err, result) => {
            if (err) res.send(err)
            else {
              res.send(result)
            }
          })
          // http://localhost:3002/api/addUser

        })
    }
  })
})


// /api/addformulaires

app.post("/api/addformname", (req, res) => {

  let id = req.body.id;
  console.log(id)
  db.query(
    "insert into list_form(Nom,dossier_par) values('Carte d''identité',?), ('CR Revue de Processus',?), (' Modèle Regles de Maîtrise des Documents Externe',?),(' Modèle Regles de Maîtrise des Documents Internes',?),('Maîtrise des Informations Documentées',?),('Surveillance et Gestion des NC',?)",
    [id, id, id, id, id, id],
    (err, result) => {
      if (err) {

        console.log({ err: err })
      }
      res.send(result)




    })
}
)
app.post("/api/addprocroot", (req, res) => {
  jwt.verify(req.body.answer, 'my_secret_key', function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      let proc = req.body.processus;


      db.query(
        "insert into dossier(libellé,id_doss) values(?,null)",
        [proc],

        (err, result) => {

          if (err) {

            console.log({ err: err })
            res.send(err)
          }
          db.query("select id_processus from dossier where libellé like ?", [proc], (err, result1) => {
            if (err) console.log(err)
            res.send(result1)
            console.log(result1)
          })  // http://localhost:3002/api/addUser

        })
    }
  })
})

app.post("/api/procdelete1", (req, res) => {
  jwt.verify(req.body.answer, 'my_secret_key', function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      let id = req.body.id;
      console.log(id)
      try {
        db.query(
          "delete from dossier where id_processus = ?",
          [id],
          (err, result) => {

            if (err) {

              console.log({ err: err })
            }
            res.send(result)




          })
      }
      catch (err) {
        // console.log(err)
      }
    }
  })
})
app.post("/api/Formdelete1", (req, res) => {
  jwt.verify(req.body.answer, 'my_secret_key', function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      let id = req.body.id;
      console.log(id)
      try {
        db.query(
          "delete from list_form where idlist_form = ?",
          [id],
          (err, result) => {

            if (err) {

              console.log({ err: err })
            }
            res.send(result)




          })
      }
      catch (err) {
        // console.log(err)
      }
    }
  })
})

app.post("/api/procdelete", (req, res) => {
  jwt.verify(req.body.answer, 'my_secret_key', function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      let id = req.body.id;
      console.log(id)
      db.query(
        "delete from dossier where libellé like ?",
        [id],
        (err, result) => {

          if (err) {

            console.log({ err: err })
          }
          res.send(result)




        })
    }
  })
})
app.post("/api/prodesactivate", (req, res) => {
  jwt.verify(req.body.answer, 'my_secret_key', function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      let id = req.body.id;
      console.log(id)
      db.query(
        "update dossier set activated = 0 where libellé like ?",
        [id],
        (err, result) => {

          if (err) {

            console.log({ err: err })
          }
          res.send(result)




        })
    }
  })
})


app.post("/api/fichiers", (req, res) => {

  jwt.verify(req.body.answer, 'my_secret_key', function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      let id = req.body.id;

      db.query(
        "select * from fichier where id_processus=?",
        [id],
        (err, result) => {

          if (err) {

            console.log({ err: err })
          }
          res.send(result)





        })
    }
  })
})
app.post("/api/getlibelle", (req, res) => {

  jwt.verify(req.body.answer, 'my_secret_key', function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      let id = req.body.id;

      db.query(
        "select libellé from dossier where id_processus=?",
        [id],
        (err, result) => {

          if (err) {

            console.log({ err: err })
          }
          res.send(result)





        })
    }
  })
})
// api upload
app.post("/api/upload", (req, res) => {


  upload(req, res, (err) => {
    jwt.verify(req.body.answer, 'my_secret_key', function (err, data) {
      if (err) {
        res.sendStatus(403);
      } else {
        if (err) {

          return res.status(500).json(err)
        }
        else {
          let name = req.file.filename;
          let id = req.body.id
          if (id == 'null') {
            db.query('insert into fichier(libellé,id_processus) values(?,null)', [name],
              (err, result) => {

                if (err) {

                  console.log({ err: err })
                }
                res.send(result)
              })
          }
          else {
            db.query('insert into fichier(libellé,id_processus) values(?,?)', [name, id],
              (err, result) => {

                if (err) {

                  console.log({ err: err })
                }
                res.send(result)
              })
          }

        }

      }

    })
  })
});

app.post("/api/getfile", (req, res) => {
  jwt.verify(req.body.answer, 'my_secret_key', function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      let id = req.body.id
      if (id) {
        db.query("select * from fichier where id_processus=?", [id], (err, result) => {
          if (!err) return res.send(result)
          res.send(err)
        })
      }
      else {
        db.query("select * from fichier where id_processus is ?", [id], (err, result) => {
          if (!err) return res.send(result)
          res.send(err)
        })
      }
    }
  })
})



app.get("/api/getfileid", (req, res) => {
  jwt.verify(req.query.answer, 'my_secret_key', function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      db.query("select id_processus from fichier ", (err, result) => {
        if (!err) return res.send(result)
        res.send(err)
      })
    }
  })
})
app.get('/api/download', function (req, res) {
  jwt.verify(req.query.token, 'my_secret_key', function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      let name = req.query.filename
      const file = `${__dirname}/public/${name}`;


      res.download(file); // Set disposition and send it.

    }
  })
});
app.get("/api/get", (req, res) => {
  jwt.verify(req.query.answer, 'my_secret_key', function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      const sqlquery = "select * from users;";
      db.query(sqlquery, (err, result) => (
        res.send(result)))
    }
  })
})

app.post("/api/filedelete", (req, res) => {
  jwt.verify(req.body.answer, 'my_secret_key', function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      let id = req.body.id;

      db.query(
        "select libellé from fichier where id_fichier=?",
        [id],
        (err, result) => {
          try {
            console.log(result)
            fs.unlinkSync(`${__dirname}/public/${result[0].libellé}`)
            //file removed
          } catch (err) {
            console.error(err)
          }



          //   }
          //  )
        })



      db.query(
        "delete from fichier where id_fichier=?",
        [id],
        (err, result) => {

          if (err) {

            console.log({ err: err })
          }
          res.send(result)
        })

      // try {
      //   fs.unlinkSync(path)
      //   //file removed
      // } catch(err) {
      //   console.error(err)
      // }




    }
  })
})

// /api/userproc
app.get('/api/userproc', (req, res) => {
  jwt.verify(req.query.answer, 'my_secret_key', function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      let id = req.query.userid
      db.query('select id_processus from users where id = ?', [id], (err, result) => { res.send(result) })
    }
  })
})
app.get('/api/isadmin', (req, res) => {
  jwt.verify(req.query.answer, 'my_secret_key', function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      let id = req.query.userid
      db.query('select statut from users where id = ?', [id], (err, result) => { res.send(result) })
    }
  })
})
app.get('/api/processusget', (req, res) => {
  jwt.verify(req.query.answer, 'my_secret_key', function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      let id = req.query.id_user
      db.query('select * from processus p,users u where u.id=p.id_user', (err, result) => {
        // db.query('select concat(nom," ",prenom) as "come" from users where id = ?',[id],(err,result)=>{console.log(result);res.json({"one":result1,"two":result})})
        if (err) console.log(err)
        console.log(result)
        res.send(result)
      })
    }
  })
})
// /api/processusmodif

app.get('/api/processusgettemp', (req, res) => {
  jwt.verify(req.query.answer, 'my_secret_key', function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      let id = req.query.id_proc
      db.query('select * from processus p,users u where u.id=p.id_user and id_proc=?', [id], (err, result) => {
        // db.query('select concat(nom," ",prenom) as "come" from users where id = ?',[id],(err,result)=>{console.log(result);res.json({"one":result1,"two":result})})
        if (err) console.log(err)
        res.send(result)
      })
    }
  })
})
app.post("/api/addprocessus", (req, res) => {
  jwt.verify(req.body.answer, 'my_secret_key', function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else {

      let id_proc = req.body.id_proc
      let titre = req.body.titre
      let desc = req.body.desc
      let pilote = req.body.pilote
      console.log("MR le pilote :",pilote)


      db.query("insert into processus(id_proc,titre,description,id_user) values(?,?,?,?)", [id_proc, titre, desc, pilote], (err, result) => {
        if (!err) { console.log(result); return res.send(result); }
        res.send(err)
      }
      )
    }
  })
})
app.post("/api/modifyprocessus", (req, res) => {
  jwt.verify(req.body.answer, 'my_secret_key', function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      let id_proc = req.body.id_proc
      let titre = req.body.titre
      let desc = req.body.desc
      let pilote = req.body.pilote

      db.query("update processus set titre=? , Description=? , id_user=? where id_proc=?", [titre, desc, pilote, id_proc], (err, result) => {
        if (!err) return res.send(result)
        res.send(err)
      }
      )
    }
  })
})
// /api/processusdelete
app.post("/api/processusdelete", (req, res) => {
  jwt.verify(req.body.answer, 'my_secret_key', function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      let id_proc = req.body.id_proc


      db.query("delete from processus where id_proc=?", [id_proc], (err, result) => {
        if (!err) return res.send(result)
        res.send(err)
      }
      )
    }
  })
})

app.get('/api/processusgetuser', (req, res) => {
  jwt.verify(req.query.answer, 'my_secret_key', function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      let id = req.query.id_user

      db.query('select concat(nom," ",prenom) as "come" from users where id = ?', [id], (err, result) => { res.send(result) })
    }
  })
})
app.post("/api/statut", (req, res) => {
  jwt.verify(req.body.answer, 'my_secret_key', function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      let id = req.body.id

      db.query("select statut from users where id = ?", [id], (err, result) => {
        if (!err) return res.send(result)
        res.send(err)
      }
      )
    }
  })
})
app.get("/api/statut", (req, res) => {
  jwt.verify(req.query.answer, 'my_secret_key', function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      let id = req.query.id

      db.query("select statut from users where id = ?", [id], (err, result) => {
        if (!err) return res.send(result)
        res.send(err)
      }
      )
    }
  })
})

app.get("/api/getform", (req, res) => {
  db.query('select Nom,idlist_form from list_form where dossier_par = ? ', [req.query.id], (err, result1) => {
    if (!err) {
      res.send(result1)
    }
    else res.send(err)
  })

})
app.get("/api/getdoss", (req, res) => {
  jwt.verify(req.query.answer, 'my_secret_key', function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      jwt.verify(req.query.answer, 'my_secret_key', function (err, data) {
        if (err) {
          res.sendStatus(403);
        } else {
          let id = req.query.id

          db.query('select libellé from dossier where id_processus = ? and activated = 1', [id], (err, result1) => {

            console.log(result1[0].libellé.split(" ")[0])
            db.query("select id_user from processus where id_proc = ? ", [result1[0].libellé.split(" ")[0]], (err, result) => {
              if (!err) {
                res.send(result);
                console.log("wowowowowow", result1[0].libellé.split(" ")[0],);
              }

              else res.send(err)
            })
            // db.query('select  from processus where ')

          })
          // 
        }
      }
      )
    }
  })
})

app.post('/shito', (req, res) => {
  jwt.verify(req.body.answer, 'my_secret_key', function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      let index = req.body.index;
      let item = req.body.item;
      db.query("insert into inputs(Name,age) values(?,?)", [item.name, item.age], (err, result) => {
        if (err) console.log(err)
        else console.log(result)
      })
    }
  })
})

app.get('/api/editdoss', (req, res) => {
  jwt.verify(req.query.answer, 'my_secret_key', function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      db.query('update dossier set libellé = ? where id_processus = ?', [req.query.lib, req.query.id])
    }
  })
})
app.get('/api/getpage', (req, res) => {
  console.log(req.query.id)
  console.log(req.query.which === "rp")
  if (req.query.which === "ci") {
    console.log("which")

    db.query('select * from  ciprocessus where user_id = ?', [req.query.id], (err, result) => {
      res.send(result)
    })
  }
  if (req.query.which === "rp") {
    console.log("which")
    db.query('select * from reprocessus where user_id = ?', [req.query.id], (err, result) => {
      res.send(result)
    })
  }
}

)


// maj les componements

app.post('/api/updateelement', (req, res) => {

  let id = req.body.id
  console.log(id)
  let data = req.body.data
  db.query('update ciprocessus set contenue = ? where idelement = ?', [data, id], (err, result) => {
    if (err) res.send(err)
    else res.send(result)
  })

}

)

app.get('/api/deleteelement', (req, res) => {
  let id = req.query.id

  db.query('delete from ciprocessus where idelement = ?', [id], (err, result) => {
    if (err) res.send(err)
    else res.send(result)
  })

}

)
app.post('/api/addtextarea', (req, res) => {
  db.query('insert into ciprocessus(type,contenue) values("textarea",null)', (err, result) => {
    if (err) res.send(err)
    else res.send(result)
  })
})
app.post('/api/addinput', (req, res) => {
  db.query('insert into ciprocessus(type,contenue) values("input",null)', (err, result) => {
    if (err) res.send(err)
    else res.send(result)
  })
})
app.post('/api/addsemiinput', (req, res) => {
  db.query('insert into ciprocessus(type,contenue) values("halfinput",null)', (err, result) => {
    if (err) res.send(err)
    else res.send(result)
  })
})
// api/addsemilibelle
app.post('/api/addsemilibelle', (req, res) => {
  db.query('insert into ciprocessus(type,contenue) values("halflib",null)', (err, result) => {
    if (err) res.send(err)
    else res.send(result)
  })
})
app.post('/api/addthirdinput', (req, res) => {
  db.query('insert into ciprocessus(type,contenue) values("thirdinput",null)', (err, result) => {
    if (err) res.send(err)
    else res.send(result)
  })
})
app.post('/api/addnewrow', (req, res) => {
  console.log(req.body.id)
  db.query('insert into indi_performance(Nom_indicateur,Definition,Formule,Responsable_maj,Periodicite,id_user) values(null,null,null,null,null,?)', [req.body.id], (err, result) => {
    if (err) res.send(err)
    else res.send(result)
  })
})
app.post('/api/addnewrow1', (req, res) => {
  console.log(req.body.id)
  db.query('insert into audit(constat,actions,responsable,dateprevu,etat,id_user) values(null,null,null,null,null,?)', [req.body.id], (err, result) => {
    if (err) res.send(err)
    else res.send(result)
  })
})
app.post('/api/addnewrow2', (req, res) => {
  console.log(req.body.id)
  db.query('insert into audit2(constat,actions,responsable,dateprevu,etat,id_user) values(null,null,null,null,null,?)', [req.body.id], (err, result) => {
    if (err) res.send(err)
    else res.send(result)
  })
})
app.post('/api/addnewrow3', (req, res) => {
  console.log(req.body.id)
  db.query('insert into audit3(constat,actions,responsable,dateprevu,etat,id_user) values(null,null,null,null,null,?)', [req.body.id], (err, result) => {
    if (err) res.send(err)
    else res.send(result)
  })
})
app.post('/api/addnewrow4', (req, res) => {
  console.log(req.body.id)
  db.query('insert into audit4(constat,actions,responsable,dateprevu,etat,id_user) values(null,null,null,null,null,?)', [req.body.id], (err, result) => {
    if (err) res.send(err)
    else res.send(result)
  })
})
app.post('/api/addnewrow5', (req, res) => {
  console.log(req.body.id)
  db.query('insert into audit5(constat,actions,responsable,dateprevu,etat,id_user) values(null,null,null,null,null,?)', [req.body.id], (err, result) => {
    if (err) res.send(err)
    else res.send(result)
  })
})
app.post('/api/addnewrow6', (req, res) => {
  console.log(req.body.id)
  db.query('insert into audit6(NTaction,NAentam,NAclot,NAeffic,id_user,Saction) values(null,null,null,null,?,null)', [req.body.id], (err, result) => {
    if (err) res.send(err)
    else res.send(result)
  })
})
app.post('/api/addnewrow7', (req, res) => {
  console.log(req.body.id)
  db.query('insert into audit7(ex,pip,oui1,explication,action,ref,id_user,oui2) values(null,null,null,null,null,null,?,null)', [req.body.id], (err, result) => {
    if (err) res.send(err)
    else res.send(result)
  })
})
// thirdzonelibellé
app.post('/api/thirdzonelib', (req, res) => {
  db.query('insert into ciprocessus(type,contenue) values("thirdlib",null)', (err, result) => {
    if (err) res.send(err)
    else res.send(result)
  })
})
app.get('/api/getperformance', (req, res) => {
  console.log(req.query.id)
  db.query('select * from  indi_performance where id_user = ?', [req.query.id], (err, result) => {
    if (!err) res.send(result)
    else res.send(err)

  })

}
  // 

)
app.get('/api/getperformance1', (req, res) => {

  db.query('select * from  audit where id_user = ? ', [req.query.id], (err, result) => {
    if (!err) res.send(result)
    else res.send(err)

  })

})
app.get('/api/getperformance2', (req, res) => {
  console.log("wowowow")
  console.log(req.query.id)
  console.log("wowowow")
  db.query('select * from  audit2 where id_user = ? ', [req.query.id], (err, result) => {
    if (!err) {res.send(result);console.log(result)}
    else res.send(err)

  })

})
app.get('/api/getperformance3', (req, res) => {
  console.log("wowowow")
  console.log(req.query.id)
  console.log("wowowow")
  db.query('select * from  audit3 where id_user = ? ', [req.query.id], (err, result) => {
    if (!err) {res.send(result);console.log(result)}
    else res.send(err)

  })

})
app.get('/api/getperformance4', (req, res) => {
  console.log("wowowow")
  console.log(req.query.id)
  console.log("wowowow")
  db.query('select * from  audit4 where id_user = ? ', [req.query.id], (err, result) => {
    if (!err) {res.send(result);console.log(result)}
    else res.send(err)

  })

})
app.get('/api/getperformance5', (req, res) => {
  console.log("wowowow")
  console.log(req.query.id)
  console.log("wowowow")
  db.query('select * from  audit5 where id_user = ? ', [req.query.id], (err, result) => {
    if (!err) {res.send(result);console.log(result)}
    else res.send(err)

  })

})

app.get('/api/getperformance6', (req, res) => {
  console.log("wowowow")
  console.log(req.query.id)
  console.log("wowowow")
  db.query('select * from  audit6 where id_user = ? ', [req.query.id], (err, result) => {
    if (!err) {res.send(result);console.log(result)}
    else res.send(err)

  })

})
app.get('/api/getperformance7', (req, res) => {
  console.log("wowowow")
  console.log(req.query.id)
  console.log("wowowow")
  db.query('select * from  audit7 where id_user = ? ', [req.query.id], (err, result) => {
    if (!err) {res.send(result);console.log(result)}
    else res.send(err)

  })

})
app.post('/api/updateallpage', (req, res) => {
  console.log("thiiiis")
  console.log(req.body.data1)
  console.log("thiiiis")


  db.query("delete from ciprocessus where user_id = ?", [req.body.user], (err, result) => { if (err) console.log(err) })


  for (const [key, value] of Object.entries(req.body.data1)) {
   

      db.query("insert into ciprocessus(type,contenue,user_id,date) values(?,?,?,NOW())", [key.split('+')[1],value, req.body.user])
 


  
}})
app.post('/api/updateallpage1', (req, res) => {

  console.log(req.body.data1)
  


  db.query("delete from reprocessus where user_id = ?", [req.body.user], (err, result) => { if (err) console.log(err) })
 
  for (const [key, value] of Object.entries(req.body.data1)) {
    
  

   db.query("insert into reprocessus(type,contenue,user_id) values(?,?,?)", [key.split('+')[1], value, req.body.user]) 
    console.log(key.split('+')[1])


  }

})
// /api/addtable
app.post('/api/addtable', (req, res) => {
  console.log(req.body.user)
  db.query('insert into ciprocessus(type,contenue,user_id) values("table",null,?)', [req.body.user], (err, result) => {
    if (err) res.send(err)
    else res.send(result)
  })
})
app.post('/api/updaterow', (req, res) => {
  let data = req.body.data;
  console.log(data.Responsable_maj);
  db.query("UPDATE indi_performance Set Nom_indicateur=?,Definition=?,Formule=?,Responsable_maj = ? ,Periodicite =  ? WHERE idIndi_Performance = ?", [data.Nom_indicateur, data.Definition, data.Formule, data.Responsable_maj, data.Periodicite, data.idIndi_Performance], (err, result) => {
    if (!err) console.log(result);
    else {
      console.log(err)
    }
  })
})
app.post('/api/updaterow1', (req, res) => {
  let data = req.body.data;
  console.log(data);
  // insert into audit(constat,actions,responsable,dateprevu,etat,id_user) 
  db.query("UPDATE audit Set constat=?,actions=?,responsable=?,dateprevu = ? ,etat =  ? WHERE idaudit = ?", [data.constat, data.actions, data.responsable, data.dateprevu, data.etat, data.idaudit], (err, result) => {
    if (!err) res.send(result);
    else {
      console.log(err)
    }
  })
})
app.post('/api/updaterow2', (req, res) => {
  let data = req.body.data;
  console.log(data);
  // insert into audit(constat,actions,responsable,dateprevu,etat,id_user) 
  db.query("UPDATE audit2 Set constat=?,actions=?,responsable=?,dateprevu = ? ,etat =  ? WHERE idaudit2 = ?", [data.constat, data.actions, data.responsable, data.dateprevu, data.etat, data.idaudit2], (err, result) => {
    if (!err) res.send(result);
    else {
      console.log(err)
    }
  })
})
app.post('/api/updaterow3', (req, res) => {
  let data = req.body.data;
  console.log(data);
  // insert into audit(constat,actions,responsable,dateprevu,etat,id_user) 
  db.query("UPDATE audit3 Set constat=?,actions=?,responsable=?,dateprevu = ? ,etat =  ? WHERE idaudit3 = ?", [data.constat, data.actions, data.responsable, data.dateprevu, data.etat, data.idaudit3], (err, result) => {
    if (!err) res.send(result);
    else {
      console.log(err)
    }
  })
})
app.post('/api/updaterow4', (req, res) => {
  let data = req.body.data;
  console.log(data);
  // insert into audit(constat,actions,responsable,dateprevu,etat,id_user) 
  db.query("UPDATE audit4 Set constat=?,actions=?,responsable=?,dateprevu = ? ,etat =  ? WHERE idaudit4 = ?", [data.constat, data.actions, data.responsable, data.dateprevu, data.etat, data.idaudit4], (err, result) => {
    if (!err) res.send(result);
    else {
      console.log(err)
    }
  })
})
app.post('/api/updaterow5', (req, res) => {
  let data = req.body.data;
  console.log(data);
  // insert into audit(constat,actions,responsable,dateprevu,etat,id_user) 
  db.query("UPDATE audit5 Set constat=?,actions=?,responsable=?,dateprevu = ? ,etat =  ? WHERE idaudit5 = ?", [data.constat, data.actions, data.responsable, data.dateprevu, data.etat, data.idaudit5], (err, result) => {
    if (!err) res.send(result);
    else {
      console.log(err)
    }
  })
})
// insert into audit6(NTaction,NAentam,NAentam,NAclot,NAeffic,id_user) values(null,null,null,null,null,?)
app.post('/api/updaterow6', (req, res) => {
  let data = req.body.data;
  console.log(data);
  // insert into audit(constat,actions,responsable,dateprevu,etat,id_user) 
  db.query("UPDATE audit6 Set Saction = ?, NTaction=?,NAentam=?,NAclot=?,NAeffic = ?  WHERE idaudit6 = ?", [data.Saction,data.NTaction, data.NAentam, data.NAclot, data.NAeffic, data.idaudit6], (err, result) => {
    if (!err) res.send(result);
    else {
      console.log(err)
    }
  })
})
app.post('/api/updaterow7', (req, res) => {
  let data = req.body.data;
  console.log(data);
  // ex,pip,oui1,explication,action,ref,id_user,oui2
  db.query("UPDATE audit7 Set ex = ?, pip=?,oui1 = ?,explication=?,action  = ? , ref = ? , id_user = ? , oui2 = ? WHERE idaudit7 = ?", [data.ex,data.pip,data.oui1,data.explication,data.action,data.ref,data.id_user,data.oui2,data.idaudit7], (err, result) => {
    if (!err) res.send(result);
    else {
      console.log(err)
    }
  })
})
app.post('/api/deleterow', (req, res) => {
  let data = req.body.data;
  console.log(data);
  db.query("delete from indi_performance where idIndi_Performance = ?", [data], (err, result) => {
    if (!err) console.log(result);
    else {
      console.log(err)
    }
  })
})
app.get('/api/getformname', (req, res) => {
  let data = req.query.data;

  db.query("select id_proc , titre from processus where id_user = ?", [data], (err, result) => {
    if (!err) res.send(result);
    else {
      console.log(err)
    }
  })
})
app.get('/api/getlatestdate', (req, res) => {
  let data = req.query.data;

  db.query("select max(date) well from ciprocessus where user_id = ?", [data], (err, result) => {
    if (!err) res.send(result);
    else {
      res.send(err)
    }
  })
})


app.listen(3002, () => {
  console.log("running on 3002")
}
)





