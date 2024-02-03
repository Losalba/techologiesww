const express = require("express");
const app = express();
const fs = require('fs');
const port = 5500;

const credentials = {secretName:"user" , secretPassword:"pass"}

const isAuthenticated = (req , res , next)=>{
    
    const encodedAuth = (req.headers.authorization || '')
    .split(' ')[1] || '';
    const [name, password] = Buffer.from(encodedAuth, 'base64')
    .toString().split(':');

    if(name===credentials.secretName && password===credentials.secretPassword){
        return next();
    }
    
    res.set('WWW-Authenticate', 'Basic realm="Access to Index"');
    res.status(401).send("Unauthorised access");
}

app.get("/" , isAuthenticated, (req ,res)=>{
    
})


app.post('/Early-albums',(req,res)=>{
    fs.readFile('earlyalbums.json','utf-8',(err,jsonString) =>{

        if(err){
            console.log(err);
        }else{
            try{
                const data = JSON.parse(jsonString);
                res.json(data);
            }catch(err){
                console.log('Error parsing JSON' , err);
            }
        }




    })
})

app.post('/Later-albums',(req,res)=>{
    fs.readFile('lateralbums.json','utf-8',(err,jsonString) =>{

        if(err){
            console.log(err);
        }else{
            try{
                const data = JSON.parse(jsonString);
                res.json(data);
            }catch(err){
                console.log('Error parsing JSON' , err);
            }
        }

        


    })
})

app.post('/Last-albums',(req,res)=>{
    fs.readFile('lastalbums.json','utf-8',(err,jsonString) =>{

        if(err){
            console.log(err);
        }else{
            try{
                const data = JSON.parse(jsonString);
                res.json(data);
            }catch(err){
                console.log('Error parsing JSON' , err);
            }
        }

        


    })
})

app.use(express.static('app/Site'));

app.use('/images', express.static('app/Site/images'));

app.listen(port, function () {
    console.log("Server listening at port " + port);
});
