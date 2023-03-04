const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.post('/request', (req, res)=>{
    let reqType = req.query.type === 'subscribe' ? 'subscribe':null;
    console.log("🚀 ~ file: server.js:13 ~ app.post ~ reqType:", reqType)
    // let name = req.body.name
    let email = req.body.email
    // let phone = req.body.phone
    // let company = req.body.company
    // let service = req.body.service
    // let description = req.body.description  
    
// Send the Service's request to Rawaj's Email
const nodemailer = require('nodemailer');
let appEmail = 'rawajalarabia.sa@gmail.com'
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:appEmail,
        pass:'rrbzjfhisiqdhguv'
    }
})
let mailOptions = {
    from:appEmail,
    to:'info@rawajalarabia.com, eslam_azzam@rawajalarabia.com, dr.amro_radi@rawajalarabia.com',
}
// Subscribe Email
if(reqType){
    mailOptions.subject = 'New subscriber request';
    mailOptions.html = `
        <h3>We have received a new subscription request from the website. The details of the request are as follows:</h3>
        <span>Email: </span> <span>${email}</span><br>
    `
}else{
    // Service Request Email
    mailOptions.subject = 'Service Request Form Submission'
    mailOptions.html = `
                        <h3>We have received a new service request. The details of the request are as follows:</h3>
                        <span>Name: </span> <span>${req.body.name}</span><br>
                        <span>Email: </span> <span>${email}</span><br>
                        <span>Phone: </span> <span>${req.body.phone}</span><br>
                        <span>Company: </span> <span>${req.body.company}</span><br>
                        <span>Service: </span> <span>${req.body.service} </span><br>
                        <span>Description: </span> <span>${req.body.description}</span><br>
                    `

}

transporter.sendMail(mailOptions, function (error, sent) {
    if(!sent || error){
        console.log("Failed send to Email", error)
        return res.json({success:false, msg:'Your request was not sent! Please try again or contact us.'})
    }
    console.log("Email sent");
    return res.json({success:true, msg:'Thank you for your request, which was successfully sent.'})
});
////////////////    

})

const PORT = process.env.PORT || 950;
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT: ${PORT}`)
})