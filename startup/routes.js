

export default function (app) {
    app.use(express.json());
    app.use(errorMiddleware)
}