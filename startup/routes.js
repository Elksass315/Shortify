import userRouter from '../routes/user.js';
import express from 'express';
import errorMiddleware from '../middleware/error.js';
import redirectionRouter from '../routes/redirection.js';


export default function (app) {
    app.use(express.json());
    app.use(errorMiddleware)

    app.use('/api/users', userRouter);
    app.use('/', redirectionRouter);
}