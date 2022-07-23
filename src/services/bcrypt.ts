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

const comparePassword = async (plainPassword: string, hashedPassword: string) => {
    return bcrypt.compare(plainPassword, hashedPassword)
    .then(result => {
        if(result === true){
            return true
        }
        throw new Error('Invalid Password')
    })
    .catch(err => {
        throw err
    })
}

export {
    hashPassword,
    comparePassword
}