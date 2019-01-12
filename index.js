const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
require('dotenv').config()

app.get('/',(req , res)=>{
    res.send(process.env.EMAIL)
})


app.post('/contact',(req , res)=>{
      let transporter = nodemailer.createTransport({
        host: "mail.akshatsoni.com",
        port: 587,
        secure: false,
        auth: {
          user:process.env.EMAIL, 
          pass:process.env.PASS 
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
          console.log("Message sent: %s", info);
          res.send("mail sent")
      })
      res.send("email sent")
    })

app.listen(port, () =>{
    console.log("server started")
})
