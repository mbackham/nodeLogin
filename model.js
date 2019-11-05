const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/express-suth',{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex:true
})
const UserSchema = new mongoose.Schema({
    username:{type:String,unique:true},
    password:{type:String}
})
const User= mongoose.model('User',UserSchema)
//User.db.dropCollection('users')
module.exports={
    User
}