import { File, Storage } from '@google-cloud/storage'
import path from 'path'

const bucketName: string = process.env.GCS_BUCKET!

const storage = new Storage({
    keyFilename: path.join(__dirname, '../../gcp.json')
})

async function uploadProfilePic(filePath: string) {
    const uploaded_file = await storage.bucket(bucketName!).upload(filePath, {
      destination: filePath,
    });
    return uploaded_file[1]
}

export {
    storage as gsStorage,
    uploadProfilePic
}