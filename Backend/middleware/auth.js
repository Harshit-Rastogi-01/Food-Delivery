import jwt from 'jsonwebtoken';

const authMiddleware =  async (req, res, next) => {
    const { token } = req.headers;
    console.log("token generated : " , token) ; 
    if (!token) {
        return res.json({success:false , message:'Not Authorized Login Again'});
    }
    try {
        const token_decode =  jwt.verify(token, process.env.JWT_SECRET); // decoding the token 
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
      console.log(error) ;
      res.json({success:false,message:error.message});
    }
}

export default authMiddleware;