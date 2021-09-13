import multer from 'multer';

const ACCEPTED_FILE_EXTENSIONS = ['image/png', 'image/jpg', 'image/jpeg'];

const fileFilter = (req, file, callback) => {
    if (!ACCEPTED_FILE_EXTENSIONS.includes(file.mimetype)) {
        const error = new Error(`Extensión de archivo no admitida. Las extensiones admitidas son: ${ACCEPTED_FILE_EXTENSIONS}.`);
        error.status = 400;

        return callback(error, true);
    }
    return callback(null, true);
};

const storage = multer.memoryStorage();

const multerUpload = multer({ storage: storage, fileFilter });

// TODO: en los formularios HTML, hay que poner:
// method="POST" enctype="multipart/form-data"
// En el que vaya a recibir varios archivos, hay que añadir también:
// multiple

export default { multerUpload };
