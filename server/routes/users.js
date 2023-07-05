import express from 'express';
import multer from 'multer';
import { addUser, deleteUser, getAllUsers, getUser, updateUser } from '../controllers/users.js';

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

// GET /users/:userId
router.get('/:userId', getUser);

// POST /users/newUser
router.post('/newUser', addUser);

// PATCH /users/:userId
router.patch('/:userId', updateUser);

// DELETE /users/:userId
router.delete('/:userId', deleteUser);

export default router;