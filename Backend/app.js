const express=require('express');
const cors=require('cors');
var app=new express();
const jwt=require('jsonwebtoken');
const BooksData=require('./models/bookData');
var bodyparser=require('body-parser')
app.use (cors());
app.use(bodyparser.json());
username="admin23@gmail.com"
password="123456"

app.post('/login',(req,res)=>{
    let userData=req.body
    if(!username){
       res.status(401).send('Invalid Username')
    } else
    if(password!==userData.password){
        res.status(401).send('Invalid Password')
    }else{
        let payload={subject:username+password}
        let token=jwt.sign(payload,'secretKey')
        res.status(200).send({token})
    }

})
app.post('/addbooks',function(req,res){
    var item={
        bookTitle:req.body.title,
        bookAuthor:req.body.author,
        bookStatus:req.body.status,
        bookDuedate:req.body.duedate
        
    }
    var data=BooksData(item);
    data.save();
    console.log(data);
    BooksData.find().then(function(data){
        res.send(data);
        console.log(data);
    })

})
app.listen("3000");