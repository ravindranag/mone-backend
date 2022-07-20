import bcrypt from 'bcrypt'
import { Request, Response, NextFunction } from 'express'

const saltRounds = 10

const hashPassword = (req: Request, res: Response, next: NextFunction) => {
    const password = req.body.password
    bcrypt.hash(password, saltRounds)
        .then(hashedPassword => {
            req.body.password = hashedPassword
            next()
        })
}

export {
    hashPassword
}