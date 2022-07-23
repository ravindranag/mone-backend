import 'dotenv/config'
import express from 'express'
import { userRouter } from './routes/user'
import { walletRouter } from './routes/wallet'

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
app.use('/wallet', walletRouter)

app.listen(port, () => {
    console.log(`server listening on ${port}`)
})