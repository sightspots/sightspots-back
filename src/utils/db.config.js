import mongoose from 'mongoose';
import dotenv  from 'dotenv';

dotenv.config();
const DB_URL = process.env.MONGODB_URL;

const connect = async () => {
    try {
        const db = await mongoose.connect(DB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        const { name, host } = db.connection; 
        console.log(`Connected to database ${name} on host ${host}.`);
    } catch (error) {
        console.log(`Error connecting to database ${name} on host ${host}.`);
    }
};

export default { DB_URL, connect };