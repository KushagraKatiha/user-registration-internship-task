import dotenv from 'dotenv'
import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) throw new Error("No path found")
        const response = await cloudinary.uploader.upload(
                localFilePath.toString(),
                {resource_type: "auto"}
            )
            // file uploaded successfully
        console.log("File uploaded on cloudinary", response.url);
        return response
    } catch (error) {
        // if file not uploaded delete it from local server
        fs.unlinkSync(localFilePath)
        console.log(error.message);
    }
}

export default uploadOnCloudinary