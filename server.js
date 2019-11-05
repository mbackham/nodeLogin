require('./model')
const {User}=require('./model')
const express = require('express')

const app = express()
const SECRET='asdasdasdasd'
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
app.post('/api/login',async(req,res)=>{
    const user = await User.findOne({
        username:req.body.username
    })
    if(!user){//如果用户没有
        return res.status(422).send({
            message:'用户名不存在'
        })
    }
    const isPasswordValid = require('bcrypt').compareSync(
        req.body.password,//第一个参数密码
        user.password
    )
    if(!isPasswordValid){
        return res.status(422).send({
            message:'密码无效'
        })
    }
    //生成token
    const jwt = require('jsonwebtoken')
    const token = jwt.sign({
        id:String(user._id),
    },SECRET)
    res.send({
        user,
    token//token表示通过登陆locolstorage存下来
})
})
app.get('/api/profile',async(req,res)=>{
    console.log(req.headers.authorization)
    return res.send('ok')
    const user=await User.findById(id)

    res.send(user)
})
app.listen(10000,()=>{
    console.log('http://localhost:10000')
})