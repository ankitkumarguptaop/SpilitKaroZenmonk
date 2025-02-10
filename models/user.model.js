const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is not given"],
  },
  email : {
    type : String,
    require : [ true , "Email is not given"]
  }
  ,
  phone_no : {
    type : String,
    require : [ true , "Phone no is not given"]
  },
  avatar : {
    type : String,
    require : [ true , "avatar is not given"]
  },
  password  : { 
    type : String,
    require : [ true , "password is not given"]  
  },
  
},{ timestamps: true });




userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


userSchema.pre("save", async function (next) {
    if (!this.isModified) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
  

exports.User = mongoose.model("User", userSchema);
