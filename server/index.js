const express = require("express")
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors())
app.use(express.json())



const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"password",
    database:"carsystem"

})


app.post("/create", (req, res)=>{
    console.log("backend");

    const brand = req.body.brand;
    const model = req.body.model;
    const color = req.body.color;
    const year = req.body.year;
    const price = req.body.price;

    db.query("INSERT INTO cars (brand, model, color, year, price) VALUES (?,?,?,?,?)", [
        brand, model, color, year, price
    ], (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send("Values inserted")
        }
    })
})

app.get("/cars", (req,res)=> {
    db.query("SELECT * FROM cars" , (err, result)=>{
        if(err){
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.put("/update", (req, res) =>{
    const id = req.body.id
    const price = req.body.price
    db.query("UPDATE cars SET  price = ? WHERE id = ?", [price, id], (err, result)=>{
        if(err){
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.delete("/delete/:id", (req, res)=>{
    const id = req.params.id
    db.query("DELETE FROM cars WHERE id = ?", id, (err, result) => {
        if(err){
            console.log(err);
        } else  {
            res.send(result)
        }
    })
})

app.listen(3001, ()=>{
    console.log("server running on port 3001");
})