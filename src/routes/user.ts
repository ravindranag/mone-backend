import express from 'express'
import multer from 'multer'
import { gsStorage, uploadProfilePic } from '../services/googleCloudStorage'
// TODO import user from prisma client

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

router.post('/', upload.single('profile_pic'), async (req, res) => {
    // TODO: create user with name, username, email and password
    // TODO: create empty wallet
    const user = req.body
    // console.log(file)
    res.json({
        user
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