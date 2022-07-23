import { User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { prisma } from './prismaClient'

interface AuthorizedRequest extends Request {
    user?: User
}

const getCurrentUser = (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    if(!token){
        res.status(403).json({
            message: 'Authorization required'
        })
    }
    prisma.token.findFirstOrThrow({
        where: {
            accessKey: token
        },
        select: {
            user: true
        }
    })
    .then(token => {
        console.log('query', token)
        req.user = token.user!
        next()
    })
    .catch(err => {
        res.status(403).json({
            error: 'Invalid authorization',
            message: 'Invalid token. Please login and try again.'
        })
    })
}

export {
    AuthorizedRequest,
    getCurrentUser
}