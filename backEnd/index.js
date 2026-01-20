const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

const json_path = "./data.json"

app.use(cors())
app.use(express.json())

let products = fs.read

console.log(products)

app.listen(3000,()=>{
    console.log("server is running on http://localhost:3000")
})


app.get("/products",(req,res)=>{
    console.log("GET")
    res.json(JSON.parse(fs.readFileSync(json_path,{flags:"r",encoding:"utf8"})))
})

app.post("/products",(req,res)=>{
    console.log("new product",req.body)
    let data = JSON.parse(fs.readFileSync(json_path,{flags:"r",encoding:"utf8"}))
    data.push(req.body)
    fs.writeFileSync(json_path,JSON.stringify(data))
})