require('./model')
const {User}=require('./model')
const express = require('express')

const app = express()
app.use(express.json())
app.get('/api/users',async(req,res)=>{
    const users = await User.find()
    res.send(users)
    //res.send('ok')
})
app.post('/api/register',async(req,res)=>{
    //console.log(req.body)
    const user = await User.create({
        username:req.body.username,
        password:req.body.password
    })
    res.send(user ) 
 
})
app.listen(10000,()=>{
    console.log('http://localhost:10000')
})