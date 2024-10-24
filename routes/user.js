import express from 'express';
import User from '../model/users.js';
import auth from '../middleware/auth.js';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import { HttpStatusCode } from 'axios';
import { generateAuthToken } from '../helpers/authToken.js';
import { hashPassword } from '../helpers/hash.js';
import winston from 'winston';


const router = express.Router();

router.get('/me', auth, async (req, res) => {
    const user = await User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.auth.id
        }
    })
    if (!user)
    {
        return res.status(HttpStatusCode.NotFound).send('User not found.');
    }
    res.send(user.toJSON());
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if (!user) {
        return res.status(HttpStatusCode.BadRequest).send('Invalid email or password.');
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(HttpStatusCode.BadRequest).send('Invalid email or password.');
    }

    const userJson = _.pick(user.toJSON(), ['id', 'name', 'email', 'phoneNumber']);
    userJson.token = generateAuthToken(user);
    res.send(userJson);
});


router.post('/register', async (req, res) => {
    let user = await User.findOne({
        where: {
            email: req.body.email
        }
    })
    if (user) {
        return res.status(HttpStatusCode.Conflict).send('User already registered.');
    }
    user = User.build({ name: req.body.name, email: req.body.email, phoneNumber: req.body.phoneNumber, password: req.body.password });
    user.password = await hashPassword(user.password);
    try {
        await user.save();
        const userJson = _.pick(user.toJSON(), ['id', 'name', 'email', 'phoneNumber']);
        userJson.token = generateAuthToken(user);
        res.status(HttpStatusCode.Created).send(userJson);
    }
    catch (ex) {
        res.status(500).send(ex.message);
    }
});


router.put('/update-password', auth, async (req, res) => {
    if (!req.body.password) {
        return res.status(400).send('Password is required.');
    }

    try {
    const user = await User.findOne({
        where: {
            id: req.auth.id
        }
    });

    user.password = await hashPassword(req.body.password)

        await user.save();
        res.send('Password changed successfully.');
    }
    catch (ex) {
        winston.error(ex.message, ex);
        res.status(500).send('something faild');
    }
});


router.put('/update', auth, async (req, res) => {
    const user = await User.findOne({
        where: {
            id: req.auth.id
        }
    });

    if (req.params.fullname) user.name = req.body.name;
    if (req.params.phoneNumber) user.phoneNumber = req.body.phoneNumber;

    try {
        await user.save();
        res.send(_.pick(user.toJSON(), ['id', 'name', 'email', 'phoneNumber']));
    }
    catch (ex) {
        res.status(500).send(ex.message);
    }

});

export default router;