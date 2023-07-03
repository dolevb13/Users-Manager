import express from 'express';
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import cors from 'cors';

const app = express();

dotenv.config();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true}));
app.use(fileUpload({
    createParentPath: true
}));
app.use(cors());

app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,    
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
}).catch((error) => console.log(`${error} did not connect`));