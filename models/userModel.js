const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,'please add a username'],
    },
    email:{
        type:String,
        required:[true,'please add an email'],
        unique:[true,'email already exists'],
    },
    password:{
        type:String,
        required:[true,'please add a password'],
        timestamps:true,
    }
});

module.exports=mongoose.model('User',userSchema);