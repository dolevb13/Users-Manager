import fs from 'fs';
import UserModel from '../models/user.js';

const deleteFile = filePath => {
    fs.unlink(filePath, err => {
        if (err) {
            throw err;
        }
    })
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

export const getUser = async (req, res) => {
    try {
        const {userId} = req.params;
        const user = await UserModel.findById(userId);
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
    }
}

export const addUser = async (req, res) => {
    try {
        const image = req.file;
        if (!image) {
            return res.status(422).json({error: 'Could not process image'});    // TODO: Fix
        }
        const {firstName, lastName, email, city, country} = JSON.parse(req.body.data);
        const user = new UserModel({name: {first: firstName, last: lastName}, email, location: {city, country}, image: image.path});
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

export const updateUser = async (req, res) => {
    try {
        const {firstName, lastName, email, city, country} = req.body;
        const updatedData = {name: {first: firstName, last: lastName}, email, location: {city, country}}
        const {userId} = req.params;
        const user = await UserModel.findByIdAndUpdate(userId, updatedData, {new: true});
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

export const deleteUser = async (req, res) => {
    try {
        const {userId} = req.params;
        const deletedUser = await UserModel.findByIdAndDelete(userId);
        if (deletedUser.image) {
            deleteFile(deletedUser.image);
        }
        res.status(204).json(deletedUser);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

