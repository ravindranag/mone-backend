import express, { Request } from 'express'
import multer from 'multer'
import { getCurrentUser, AuthorizedRequest } from '../services/auth'
import { prisma } from '../services/prismaClient'

const router = express.Router()

export {
    router as walletRouter
}

router.get('/', getCurrentUser, async (req: AuthorizedRequest, res) => {
    
})