import express from 'express'
import multer from 'multer'
import { hashPassword } from '../middlewares/bcrypt'
import { gsStorage, uploadProfilePic } from '../services/googleCloudStorage'
import { prisma } from '../services/prismaClient'

const router = express.Router()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const username = req.body.username
      cb(null, username + '-' + file.originalname)
    }
  })
  
const upload = multer({storage})

router.post('/', hashPassword, async (req, res) => {
    // TODO: create user with name, username, email and password
    // TODO: create empty wallet
    const user = req.body
    user.username = user.email.split('@')[0]
    console.log(user)
    prisma.user.create({
      data: {
        ...user,
        wallet: {
          create: {
            amount: 0
          }
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        profile_pic: true,
        wallet: {
          select: {
            id: true,
            amount: true
          }
        }
      }
    })
    .then(user => {
      res.json({
        user
      })
    })
    .catch(err => {
      if(err.code === 'P2002'){
        res.status(404).json({
          message: 'duplicate email address'
        })
      } else {
        res.status(500).json({
          message: 'Some error occurred'
        })
      }
    })
    
})

router.get('/', async (req, res) => {
  const allUsers = await prisma.user.findMany({
    include: {
      wallet: true
    }
  })
  res.json({
    users: allUsers
  })
})

router.post('/profile-pic', upload.single('profile_pic'), async (req, res) => {
    const file = req.file
    const uploaded = await uploadProfilePic(file!.path)
    .catch(err => {
        console.log(err)
    })

    // TODO: update profile_pic field of user
    res.json({
        message: 'Profile picture uploaded successfully',
        // TODO send updated user
    })
})

export { router as userRouter }