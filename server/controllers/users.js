import fs from 'fs';
import UserModel from '../models/user.js';

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
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(422).json({message: errors.array()[0].msg, errors: errors.array()});
        // }
        const {firstName, lastName, email, city, country} = req.body;
        const user = new UserModel({name: {first: firstName, last: lastName}, email, location: {city, country}});
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

