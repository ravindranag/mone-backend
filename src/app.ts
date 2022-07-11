import 'dotenv/config'
import express from 'express'

const app = express()
const port: number = 8000

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'server running',
        info: process.env.INFO
    })
})

app.listen(port, () => {
    console.log(`server listening on ${port}`)
})