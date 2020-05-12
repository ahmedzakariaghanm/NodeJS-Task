// const e = require("express")

// import fetch from "node-fetch"

document.getElementById('loginbtn').addEventListener('click',loginWithFacebook,false)

function loginWithFacebook(){
    // e.preventDefault()
    FB.login(response=>{
        // console.log(response)
        const {authResponse:{accessToken,userID}}=response

        fetch('/login-with-facebook',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({ accessToken,userID})
        }).then((res) => { 
            status = res.status; 
            return res.json() 
          })
          .then((jsonData) => {
            console.log(jsonData);
            console.log(status);
            document.getElementById('myText').value =jsonData.data.accessToken;


          })
        // console.log(ttt)
        FB.api('/me',function(response){
            // console.log(JSON.stringify(response))
        })
    },{scope:'public_profile,email'})

    return false
}