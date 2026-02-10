const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

const json_path = "./data.json"

//const qs = require('qs')

app.use(cors())
app.use(express.json())
/*app.set('query parser', (str) => {
    qs.parse(str, {
        
    })
})*/

let products = fs.read

console.log(products)

app.listen(3000,()=>{
    console.log("server is running on http://localhost:3000")
})


app.get("/products",(req,res)=>{
    console.log(req.query)
    const {category} = req.query;
    res.json(JSON.parse(fs.readFileSync(json_path,{flags:"r",encoding:"utf8"})))
})

app.post("/products",(req,res)=>{
    let data = JSON.parse(fs.readFileSync(json_path,{flags:"r",encoding:"utf8"}))
    data.push(req.body)
    fs.writeFileSync(json_path,JSON.stringify(data))
})







app.get("products/:id", (req, res) => {
    //let data = JSON.parse(fs.readFileSync(json_path,{flags:"r",encoding:"utf8"}))
    //const item = data.filter(v=>v.product_id == req.params.id)
    console.log("filter: " + req.params.id)
    res.json(JSON.parse(fs.readFileSync(json_path,{flags:"r",encoding:"utf8"})))
})





app.delete("/products/:id",(req,res)=>{
    let data = JSON.parse(fs.readFileSync(json_path,{flags:"r",encoding:"utf8"}))
    data = data.filter(v=>v.product_id != req.params.id)
    fs.writeFileSync(json_path,JSON.stringify(data))
    console.log("data: " + data)
    console.log("deleted " + req.params.id)
    res.json({"deleted":true})
})