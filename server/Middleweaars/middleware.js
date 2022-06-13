const user = require("../models/usermodels");
const jwt = require("jsonwebtoken");

module.exports.checkUser = (req,res,next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(
            token,
            "umar secret key" , 
        async (err,decodedToke)=>{
if (err) {
    res.json({status:false});
    next();
}else{
    const user = await user.findById(decodedToken.id);
    if (user) res.json({ status:true,user:user.email})
    else res.json({status:false});
    next();
}
}
);
    }else{
        res.json({status:false});
        next();
    } 
};
