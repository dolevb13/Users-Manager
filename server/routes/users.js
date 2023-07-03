import express from 'express';
import multer from 'multer';
import { addUser, getAllUsers, getUser } from '../controllers/users.js';

const router = express.Router();

/* FILE STORAGE CONFIGURATION */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/assets");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

// GET /users/usersList
router.get('/usersList', getAllUsers);

// GET /users/:user
router.get('/:userId', getUser);

// POST /users/newUser
router.post('/newUser', addUser);
// router.post('/newUser', upload.single("image"), addUser);

export default router;