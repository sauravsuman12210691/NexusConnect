const jwt = require('jsonwebtoken');
const jwt_SECRT = "saurav123"
const getuser=(req,res,next)=>{
    const token=req.header('auth-token')
    console.log(token)
    if(!token){
        res.status(401).send({error:"Please authenticate using a valid token"})

    }
   try{
    const data =jwt.verify(token,jwt_SECRT);
    req.user=data.user;
    next();
   }catch(e){
    res.status(401).send({error:"system"})

   }
}
module.exports=getuser;