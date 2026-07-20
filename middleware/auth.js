const jwt = require('jsonwebtoken')


const auth = (req,res,next)=>{


    try {
        const token = req.headers.authorization

        if(!token){
            return res.status(401).jso({message:"No token"})
        }

        const verifyUser = jwt.verify(token,process.env.JWT_SECRET)
        next()
    } catch (error) {
        return res.status(403).json({message:"Token is invalid or expired"})
    }

}

module.exports = auth