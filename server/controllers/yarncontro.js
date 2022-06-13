let usermodels = require ("../models/usermodels");
let jwt = require("jsonwebtoken");

let maxAge = 3*24*60*60;

let createToken = (id)=>{   

     return jwt.sign({id},"umar secret key", {
         expiresIn:maxAge
     });
};

let handleErrors = (err) => {
    let errors = {name: "", email:"",password:""};
    if(err.message === "incorrect email")
     errors.email = "the email is not registerd"

     if(err.message==="incorrect password")
     errors.email = "the password is not registerd"

if(err.code === 11000){
    errors.email = "email is already registerd";
    return errors;
}
if (err.message.includes("user validation failed")){
    Object.values(err.errors).forEach(({properties}) =>{
        errors[properties.path] = properties.message;
    })
}
return errors;
}

module.exports.signup = async (req,res,next) => {
    try{

        const {name,email,password} = req.body

        const user = await usermodels.create({name,email,password});
        const token = createToken(user._id);

res.cookie("jwt",token,{
    withCredentials:true,
    httponly:false,
    maxAge: maxAge *1000
})
res.status(201).json({user:user._id, created :true})
    } catch(err) {
        console.log(err);
        const errors = handleErrors(err);
        res.json({errors,created:false})
    }
};

module.exports.signin = async (req,res,next) => { 
    try{

        const {email,password} = req.body

        const user = await usermodels.signin(email,password);
        const token = createToken(user._id);

res.cookie("jwt",token,{
    withCredentials:true,
    httponly:false,
    maxAge: maxAge *1000
})
res.status(200).json({user:user._id, created :true})
    } catch(err) {
        console.log(err);
        const errors = handleErrors(err);
        res.json({errors,created:false})
    }
};


