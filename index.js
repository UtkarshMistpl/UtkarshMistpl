const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const fs = require('fs');
const readXlsxFile = require('read-excel-file/node');
const path = require('path');
const __basedir =  "public";
var multer  = require('multer');
const http = require("https");
var crypto = require("crypto");
require('dotenv').config();

app.use(express.json());
const port = 3000

// postgres database connection

const { Client } = require('pg');

// const db = new Client({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'substituteplayer',
//     password: 'Utkarsh@2022',
//     port: 5432,
// });

const db2= new Client({
    user: 'vzzpenbqjyksfa',
    host: 'ec2-3-225-79-57.compute-1.amazonaws.com',
    database: 'd37hpri1ltsilg',
    password: '29568fbd2ced105b4ff318cbf96eadf56d92c1e4d2e6416f9a2c88a08861b4c7',
    port: 5432,
})



db2.connect(function (err) {
    if (err) {
    return console.error('error: ' + err.message);
    }
    console.log('Connected to the psql server.');
    });


    
if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
}

// const { Server } = require("socket.io");
app.use(cors({
  origin: process.env.ORIGIN,
  methods: ["GET", "POST"],
  credentials:true,
}));



const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
// multer 
//! Use of Multer
// var storage = multer.diskStorage({
//   destination: (req, file, callBack) => {
//       callBack(null, './public/images/')     // './public/images/' directory name where save the file
//   },
//   filename: (req, file, callBack) => {
//       callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//   }
// })

// var upload = multer({
//   storage: storage
// });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, __basedir + '/uploads/')
    },
    filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
    });
    const upload = multer({storage: storage}).single('file');


// -> Express Upload RestAPIs
app.post('/uploadfile',  (req, res) =>{
    upload(req, res, (err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("working");
            res.send("test");
        importExcelData2MySQL(__basedir + '/uploads/' + req.file.filename);

        }
    });

console.log(res);
});

// -> Import Excel Data to MySQL database
function importExcelData2MySQL(filePath){
// File path.
readXlsxFile(filePath).then((rows) => {
// `rows` is an array of rows
// each row being an array of cells.     
console.log(rows);
/**
[ [ 'Id', 'Name', 'Address', 'Age' ],
[ 1, 'john Smith', 'London', 25 ],
[ 2, 'Ahman Johnson', 'New York', 26 ]
*/
// Remove Header ROW
// rows.shift();
// Open the MySQL connection
let query = 'INSERT INTO sport_center (name, sport, address, lat, lang, city ) VALUES ?';


db.query(query, [rows], (error, response) => {
    console.log("inside query");
console.log(error || response);
/**
OkPacket {
fieldCount: 0,
affectedRows: 5,
insertId: 0,
serverStatus: 2,
warningCount: 0,
message: '&Records: 5  Duplicates: 0  Warnings: 0',
protocol41: true,
changedRows: 0 } 
*/
});


})
}


//For players table
// -> Express Upload RestAPIs
app.post('/uploadfileplayer',  (req, res) =>{
    upload(req, res, (err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("working");
            res.send("test");
        importExcelData2MySQLPlayer(__basedir + '/uploads/' + req.file.filename);

        }
    });

console.log(res);
});

// -> Import Excel Data to MySQL database
function importExcelData2MySQLPlayer(filePath){
// File path.
readXlsxFile(filePath).then((rows) => {
// `rows` is an array of rows
// each row being an array of cells.     
console.log(rows);
/**
[ [ 'Id', 'Name', 'Address', 'Age' ],
[ 1, 'john Smith', 'London', 25 ],
[ 2, 'Ahman Johnson', 'New York', 26 ]
*/
// Remove Header ROW
// rows.shift();
// Open the MySQL connection
let query = 'INSERT INTO player (name, lname, phone, sport, email, Address, skill, avail_day,  _from, _to, rang, prof, charge ) VALUES ?';


db.query(query, [rows], (error, response) => {
    console.log("inside query");
console.log(error || response);
/**
OkPacket {
fieldCount: 0,
affectedRows: 5,
insertId: 0,
serverStatus: 2,
warningCount: 0,
message: '&Records: 5  Duplicates: 0  Warnings: 0',
protocol41: true,
changedRows: 0 } 
*/
});


})
}


//upload image form form
app.post('/uploadimage',  (req, res) =>{
    upload(req, res, (err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("image uploaded");
            res.send("test");
        }
    });

console.log(res);
});


// nodejs mailer functions 
var nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user: 'utkarshdixit998@gmail.com',
      pass: 'quwieorp02'
    },
    tls:{
        rejectUnauthorized:false,
    },
  });

var mailOptions = {
  from: 'utkarshdixit998@gmail.com',
  to: 'utkarsh@mistpl.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

app.use(session({
    key:"username",
    secret:"asdfghjkl",
    resave:false,
    saveUninitialized:false,
    cookie: {
        path:"/",
        expires: 60*60*24*1000,
        secure:false
      }
}));

// const db = mysql.createConnection({
// host:"localhost",
// user:"root",
// password:"",
// database:"Get_A_Game"
// });








app.post("/PlayerForm", (req, res)=>{
const fname = req.body.fname;
const lname = req.body.lname;
const sport = req.body.sport;
const skill = req.body.skills;

const phone = req.body.phone;
const email = req.body.email;
const address = req.body.address;


const chk = req.body.chk;
const from = req.body.from;
const to = req.body.to;
const prof = req.body.prof;
const rate = req.body.rate;
const range = req.body.range;
const lat = req.body.lat;
const lang = req.body.lang;
const charge = parseInt(rate);
const dist = parseInt(range);
const sp_val = sport.toString();
const  day_val = chk.toString();

db.query(
    "INSERT INTO player (name, lname, phone, sport, email, Address,  lat, lang, skill, avail_day,  _from, _to, rang, prof, charge ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [fname, lname,  phone, sp_val, email, address,  skill, day_val,  from, to, dist, prof, rate] ,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            transport.sendMail({from:"utkarshdixit998@gmail.com", to:email,subject: 'Sending Email using Node.js',
            text: 'Success'}, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              }); 
            res.send("Value Inserted");
        }
    }
);

});

// app.post('/photo',upload.single('image'), (req, res)=>{
//   res.send("success");
// });
// Registeration of a club or a sport center by post

app.post("/ClubRegistration", (req, res)=>{
    const name = req.body.name;
    const sport = req.body.sport;
    const address = req.body.address;
    
    const chk = req.body.chk;
    const from = req.body.from;
    const to = req.body.to;
   
    const phone = req.body.phone;
    const email = req.body.email;
    const charge = req.body.charge;
    
    let days = chk.toString();
    let sp_val = sport.toString();
var id = crypto.randomBytes(20).toString('hex');
    db.query(
        "INSERT INTO sport_center (name, sport, address, phone, email, days, _from, _to, fee ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [name, sp_val, address, phone, email, days, from, to, charge] ,(err,result)=>{
            if(err){
                console.log(err);
            }else{
                transport.sendMail({from:"utkarshdixit998@gmail.com", to:email,subject: 'Sending Email using Node.js',
                text: 'Success'}, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  }); 
                res.send("value Inserted");
            }
        }
    );
    
    });

// const sp ="cricket";

app.post("/PlayerData",(req, res)=>{
     const spt = req.body.spt;
     db.query("SELECT * FROM player",(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
     });

});

app.post("/login",(req, res)=>{
    const uname = req.body.uname;
    const upass = req.body.upass;
    db.query("SELECT * FROM users WHERE email = '" + uname + "' AND password = '" + upass + "'",(err,result)=>{
       if(err){
           console.log(err);
       }
       else{
           req.session.user = result;
           console.log(req.session.user);//sus
           res.send(result);
       }
    });

});

app.post("/logout", (req, res)=>{
 if(req.cookies){
     console.log("logout");
     req.session.destroy();
     res.send("Deleted");

 }else{
     res.send("no cookie found");
 }
});

app.get("/login", (req, res) =>{
  // console.log(req.session.user);//sus
  console.log("cookie");

 if(req.session.user){
     console.log(req.session.user);
     let u = req.session.user[0].role;
     console.log(u);
     res.send({logedIn:true,user:u});
 }else{
    console.log(req.session.user);
   res.send({logedIn:false,user:'not'});
 }
});

app.post("/PlayerData",(req,res)=>{
const lct = req.body.lct;
db.query("SELECT Address FROM player", (err, result)=>{
    if(err){
        console.log(err);
    }else{
        res.send(result);
    }

});
});

app.post("/SportCenter",(req, res)=>{
    const address = req.body.address;
    db.query("SELECT * FROM sport_center WHERE address = '" + address + "'",(err,result)=>{
       if(err){
           console.log(err);
       }
       else{
           console.log("In");
           res.send(result);
       }
    });

});

app.post('/sportsdata', (req, res)=>{
    db.query("SELECT * FROM sport_list",(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
           //  console.log(result);
            res.send(result);
        }
     });
})

app.post("/profile",(req, res)=>{
   const name = req.body.name
    db.query("SELECT * FROM player where name = '" + name + "'",(err,result)=>{
       if(err){
           console.log(err);
       }
       else{
         console.log("profile Data");
           console.log(result);
           res.send(result);
       }
    });

});



app.post("/player",(req, res)=>{

  const spt = req.body.spt;
  const day = req.body.day;

   db.query("SELECT * FROM player WHERE sport LIKE '%"+spt+"%' AND avail_day LIKE '%"+day+"%'",(err,result)=>{
      if(err){
          console.log(err);
      }
      else{
          console.log(result);
          res.send(result);
      }
   });

});

app.post("/club",(req, res)=>{
  const name = req.body.name
   db.query("SELECT * FROM sport_center LIMIT 20",(err,result)=>{
      if(err){
          console.log(err);
      }
      else{
          console.log("workind data");
          res.send(result);
      }
   });

});


app.post("/Sports_Center",(req, res)=>{
    const name = req.body.name;

    db.query("SELECT * FROM sport_center",(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("workind data");
            res.send(result);
        }
     });
});

app.post("/clubDelete",(req, res)=>{
  const name = req.body.name
   db.query("DELETE FROM sport_center WHERE name ='"+name+"'",(err,result)=>{
      if(err){
          console.log(err);
      }
      else{
          console.log(result);
          res.send(result);
      }
   });

});

app.post("/playerDelete",(req, res)=>{
  const name = req.body.name
   db.query("DELETE FROM player WHERE name ='"+name+"'",(err,result)=>{
      if(err){
          console.log(err);
      }
      else{
          console.log(result);
          res.send(result);
      }
   });

});
app.post("/otpVerify",(req, res)=>{
    const email=req.body.email;
    const message=""+Math.floor(Math.random()*90000) + 10;
    console.log(message);
    transport.sendMail({from:"utkarshdixit998@gmail.com", to:email,subject: 'Sending Email using Node.js',
    text: message +" "}, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.send(message);
        }
      });

});

app.post("/update_pass",(req,res)=>{
    const pass = req.body.pass;
    const email = req.body.email;
    db.query("UPDATE users SET password = ? WHERE email= ?",[pass, email],(err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
})

app.post("/Edit",(req, res)=>{
  const id = req.body.id;
  const name= req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const address= req.body.address;
  
  const skill = req.body.skill;
  const days = req.body.days;
  const from = req.body.from;
  const to = req.body.to;
  const sport = req.body.sport;
  const range = req.body.range;
  const charge = req.body.charge;
  const prof = req.body.prof;
  
  db.query("UPDATE player SET name=?, phone=?, email=?, Address=?, sport= ?, skill=?, avail_day=?, _from=?, _to=?, rang=?, prof=?, charge=?  WHERE id = ?",[name,phone, email, address, sport, skill, days,from, to, range, prof, charge, id],(err,result)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(result);
        res.send(result);
    }
  });
});


app.post("/show_old",(req, res)=>{
    const id = req.body.id;
    
    db.query("SELECT * FROM player WHERE id ='" + id + "'",(err,result)=>{
      if(err){
          console.log(err);
      }
      else{
          console.log("edit result : "+id);
          res.send(result);
      }
    });
  });

app.post("/EditClub",(req, res)=>{
    const id = req.body.id;
    const name= req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const address= req.body.address;
    const days = req.body.days;
    const from = req.body.from;
    const to = req.body.to;
    const sport = req.body.sport;
    const fee = req.body.fee;

    
    db.query("UPDATE sport_center SET name=?, phone=?, email=?, address=?, sport= ?, days=?, _from=?, _to=?, fee=?  WHERE center_id = ?",[name,phone, email, address, sport, days,from, to, fee, id],(err,result)=>{
      if(err){
          console.log(err);
      }
      else{
          console.log(result);
          res.send(result);
      }
    });
  });

  app.post("/show_old_club",(req, res)=>{
    const id = req.body.id;
    
    db.query("SELECT * FROM sport_center WHERE center_id ='" + id + "'",(err,result)=>{
      if(err){
          console.log(err);
      }
      else{
          console.log("edit result : "+id);
          res.send(result);
      }
    });
  });

  app.post("/clubcitywise",(req, res)=>{
db.query("SELECT COUNT (*) FROM sport_center GROUP BY city", (err, result)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("city wise list");
        res.send(result);
    }
});
  });

  //psql querries in the file

  

 

app.listen(process.env.PORT || 3001 ,()=>{
    console.log("server running..");
});