const express = require('express');
const app = express();
const bodyParser = require("body-parser");
var nodemailer = require('nodemailer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
require('dotenv').config()

app.get('/',(req , res)=>{
    res.send("hello friends")
})


app.post('/contact',(req , res)=>{
      let transporter = nodemailer.createTransport({
        host: "mail.akshatsoni.com",
        port: 587,
        secure: false,
        auth: {
          user:process.env.EMAIL, 
          pass:Process.env.PASS 
        },
        tls:{
          rejectUnauthorized:false
        }
      });

      let mailOptions = {
        from:'"akshat"<akshat@akshatsoni.com>',
        to: "akshat@akshatsoni.com",
        subject:"new mail from website", 
        text:`hello Akshat ,
              ${ req.body.fullname } is written:
              ======================
              ${req.body.message}
              ======================
              with-
              Phone no: ${ req.body.phone }
              Email : ${ req.body.email }`, 
      };

      let info = transporter.sendMail(mailOptions , (error, info)=>{
        if(error){
          console.log(error)
        }
      })

    console.log("Message sent: %s", info);
})



app.listen(4000, () =>{
    console.log("server started")
})