import 'dotenv/config'
import express from 'express'
import { userRouter } from './routes/user'

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
// app.use(express.urlencoded())
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'server running',
        info: process.env.INFO
    })
})

app.use('/user', userRouter)

app.listen(port, () => {
    console.log(`server listening on ${port}`)
})