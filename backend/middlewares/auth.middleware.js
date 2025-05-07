import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ' )[1];
    if(!token){
        return res.status(401).json({
            success: false,
            msg: 'Unauthorized'
        })
    }

    try{
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch{
        res.status(403).json({
            success: false,
            msg: 'Invalid token'
        })
    }
}

export default auth;