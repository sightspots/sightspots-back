import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// TODO: Refactor this

const cloudinaryAvatarUpload = (req, res, next) => {
    if (req.file) {

        const avatarEndPipe = cloudinary.uploader.upload_stream({ folder: 'sightspots_user_avatars' }, function (error, file) {
            if (error) next(error);

            req.pictureUrl = file.url;
            next();
        });

        streamifier.createReadStream(req.file.buffer).pipe(avatarEndPipe);
    } else {
        next();
    }
}

const cloudinaryLocationUpload = (req, res, next) => {
    if (req.files) {

        const locationEndPipe = cloudinary.uploader.upload_stream({ folder: 'sightspots_loc_pictures' }, function (error, file) {
            if (error) next(error);

            req.pictureUrl = file.url;
            next();
        });

        streamifier.createReadStream(req.file.buffer).pipe(locationEndPipe);
    } else {
        next();
    }
}

export default { cloudinaryAvatarUpload, cloudinaryLocationUpload };