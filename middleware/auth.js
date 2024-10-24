import { HttpStatusCode } from 'axios';
import { verifyAuthToken } from '../helpers/authToken.js';


function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(HttpStatusCode.Unauthorized).send('Access denied. No token provided.');

    try {
        req.auth = verifyAuthToken(token);
        next();
    } catch (ex) {
        res.status(HttpStatusCode.Unauthorized).send('Invalid token.');
    }
}

export default auth;