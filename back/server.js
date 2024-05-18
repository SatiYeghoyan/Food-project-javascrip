const express = require("express");
const cors = require("cors");


const sqlite3 = require("sqlite3");


 const app = express();

 const PORT = 8888;

 app.use(cors(), express.json());

 const DB = new sqlite3.Database("./db.db");

app.post("/data", (req,res) => {
   const {name, phone} = req.body
   const insertQuery = "INSERT INTO users (name, phone) VALUES (?,?);"
DB.run(insertQuery, [name,phone], (err)=>{
     if(err){
      res.status(500).send("DB ERROR");
     }else{
      res.status(200).send("All is Ok");
     }
});


});

// app.post("/create_menu",(req,res) =>{
//    const{title,description,price,image} = req.body;

//    const insertQuery = "Insert into menu(title,description,price,image) VALUES (?,?,?,?);"
//    DB.run(insertQuery,[title,description,price,image], (err) =>{
//       if(err){
//          res.status(500).send("DB ERROR");
//       }else{
//          res.status(200).send("All is Ok in Menu DB");
//       }
//    });
// });
app.get("/users", (req,res) =>{
   const selectQuery = "SELECT * FROM users";
   DB.all(selectQuery,(err,rows) => {
      if(err) {
         res.status(500).send("ERROR in Get Users"); 
      }else{
         res.status(200).send(rows)
      }
   });
});



 app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
 });