import jwt from 'jsonwebtoken';
import _ from 'lodash';


function generateAuthToken(user) {
    const userJson = _.pick(user.toJSON(), ['id', 'email', 'phoneNumber']);

    const payload = {
        id: userJson.id,
        email: userJson.email
    };
    const secretKey = process.env.JWT_PRIVATE_KEY;
    const options = {
        expiresIn: process.env.JWT_EXP_TIME 
    };

    return jwt.sign(payload, secretKey, options);
}

function verifyAuthToken(token) {
    const secretKey = process.env.JWT_PRIVATE_KEY;
    return jwt.verify(token, secretKey);
}

export { generateAuthToken, verifyAuthToken };