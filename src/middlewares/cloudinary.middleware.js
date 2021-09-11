import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const avatarUpload = (req, res, next) => {
    if (req.file) {

        const avatarEndPipe = cloudinary.uploader.upload_stream({ folder: 'sightspots_user_avatars' }, function (error, fileUploaded) {
            if (error) next(error);

            req.picturesUrl = fileUploaded.url;
            next();
        });

        streamifier.createReadStream(req.file.buffer).pipe(avatarEndPipe);
    } else {
        next();
    }
}

const uploadPromise = (bufferData) => {
    return new Promise((resolve, reject) => {
        const locationEndPipe = cloudinary.uploader.upload_stream({ folder: "sightspots_location_pictures" }, (error, fileUploaded) => {
            if (error) reject(error);
            resolve(fileUploaded.url);
        });

        streamifier.createReadStream(bufferData).pipe(locationEndPipe);
    })
};


const locationUpload = async (req, res, next) => {
    if (req.files) {
        req.picturesUrl = await Promise.all(req.files.map((file) => uploadPromise(file.buffer)));
        next();

    } else {
        next();
    }
}

export default { avatarUpload, locationUpload };