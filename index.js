const express = require('express')
const app = express()
const fs = require('fs');
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')
const mongoose = require('mongoose')
const user = require('./model')
mongoose.connect('mongodb://localhost/nodejsTask',{ useUnifiedTopology: true, useNewUrlParser: true , useCreateIndex: true,useFindAndModify: false})
var key = fs.readFileSync('key.pem');
var cert = fs.readFileSync( 'cert.pem' );
var options = {
    key: key,
    cert: cert
  };

app.use('/',express.static(path.join(__dirname,'src')))
app.use(bodyParser.json())
var server = require('https').createServer(options, app);
app.post('/login-with-facebook',async (req,res)=>{
    const {accessToken, userID}=req.body;
    // console.log(req.body)
    const response = await fetch(`https://graph.facebook.com/v1.0/me?access_token=${accessToken}&method=get&pretty=0&sdk=joey&suppress_http_code=1`)
    const json = await response.json()

    if(json.id === userID){
       const resp = await user.findOne({facebookID:userID});
       if(resp){
        //  res.status(201).send(JSON.stringify({'msg':"You are logged in "}, null, 4));

           return res.json({status:'ok',data:resp})
       }
       else {
           const person = new user({
               name:'Someone',
               facebookID:userID,
               accessToken
           })
           await person.save()
           res.json({status:'ok',data:person})

       }
    }
    else{

    }
})
server.listen(8080, _=>console.log('Listenning'))