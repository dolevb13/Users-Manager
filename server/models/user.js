import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        first: {
            type: String,
            required: true
        },
        last: {
            type: String,
            required: true
        }
    },
    email: {type: String, required: true, unique: true},
    location: {
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    image: {
        type: String
    }
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;