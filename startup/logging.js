import winston from "winston";
import "express-async-errors";

export default function () {
    winston.exceptions.handle(
        new winston.transports.File({ filename: process.env.LOG_FILE || "uncaughtExceptions.log" }),
        new winston.transports.Console());
}