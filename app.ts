import express, { type Express, type Request, type Response } from 'express'

const app: Express = express();

app.get("/", (req, res) => {
    res.json({message: "Good job!!!!"});
})

export default app;