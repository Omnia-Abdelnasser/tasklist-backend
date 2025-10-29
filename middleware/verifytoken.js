
const jwt = require('jsonwebtoken');
// token verification middleware
function verifyToken(req, res, next) {
    const token=req.headers.token;
    if(!token){
        return res.status(401).json({message:"Access denied. No token provided."});
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }catch(err){
        res.status(400).json({message:"Invalid token."});
    }
}
// authorization middleware
function verifyTokenAndAuthorization(req,res,next){
    verifyToken(req,res,()=>{
        if(req.user._id===req.params.id){
            next();
        }else{
            res.status(403).json({message:"Forbidden"});
        }
    });
}

module.exports={verifyToken,verifyTokenAndAuthorization};
