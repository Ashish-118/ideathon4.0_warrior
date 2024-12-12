import { v2 as cloudinary } from "cloudinary";
import fs from "fs";  // it is included in Node js


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null

        //upload the file on the cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        // console.log("file is uploaded to the cloudinary ", response.url)


        // remove the locally saved temporary file as the upload operation is successful
        // console.log(localFilePath)
        fs.unlinkSync(localFilePath)


        return response

    } catch (error) {

        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed 
        return null;
    }

}


export { uploadOnCloudinary }










