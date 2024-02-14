import JWT from 'jsonwebtoken'

const authToken = async (req, res, next) => {
    try{
        const token = req.cookies.token;

        if(!token){
            throw new Error('Unauthorized');
        }

        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: decoded.id
        };
        next();
    
    }catch{
        res.status(400).json({
            message: error.message
        })
    }
}

export default authToken;