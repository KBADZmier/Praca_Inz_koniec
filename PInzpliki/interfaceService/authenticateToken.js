import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const secret= process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, secret, (err, administration) => {
        if (err) return res.sendStatus(403);
        req.administration = administration;
        next();
    });
};

export const authorizeRole = (roles) => (req, res, next) => {
    authenticateToken(req, res, () => {
        if (!roles.includes(req.administration.role)) {
            return res.status(403).send('Access denied');
        }
        next();
    });
};



export default authenticateToken;
