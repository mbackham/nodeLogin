const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/express-auth',{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex:true
})
const UserSchema = new mongoose.Schema({
    username:{type:String,unique:true},
    password:{
        type:String,
        set(val){
            return require('bcrypt').hashSync(val,10)//加密 值和加密等级
        }
    }
})
const User= mongoose.model('User',UserSchema)
//User.db.dropCollection('users')删除
module.exports={
    User
}