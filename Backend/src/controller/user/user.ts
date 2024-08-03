import { Request, Response } from 'express';
import User from '../../models/db/users';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import multer from 'multer';

const upload = multer({ dest: '../../uploads' })

dotenv.config();

const secret = process.env.JWT_SECRET as string

const saltRounds = 10;

const isValid = function(value: any){
    if(typeof value == "undefined" || value === null){
        return false
    }
    if(typeof value == "string" && value.trim().length === 0){  
        return false
    }
    if(typeof value =="number" && value.toString().trim().length === 0){
        return false
    }

    return true
}



export const signUp = async (req: Request, res: Response) => {
    try {
        const { fname, lname, email, phone, password, address, profileImage } = req.body;

        if (!address) {
            return res.status(400).json({ message: 'Address details are required' });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const existingPhoneUser = await User.findOne({ where: { phone } });
        if (existingPhoneUser) {
            return res.status(400).json({ message: 'User with this phone number already exists' });
        }

        if (!password) {
            return res.status(400).send({ status: false, msg: "Password is required" });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({
            fname,
            lname,
            email,
            profileImage,  
            phone,
            password: hashedPassword,
            address,
        });

        return res.status(201).json({ message: `Hello ${newUser.email}` });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};



export const login = async (req: Request, res: Response) => {
    try {
        const data = req.body;

        const { email, password } = data;

        if (!isValid(password)) {
            return res.status(400).send({ status: false, msg: "Enter Correct password" });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        if (!user.password) {
            console.log('User password field is missing or null');
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, secret, { expiresIn: '1h' });

        return res.status(200).json({ token });
    } catch (error: any) {
        console.error('Error during login:', error.message);
        return res.status(500).json({ message: error.message });
    }
};


export const logout = (req: Request, res: Response) => {
    return res.status(200).json({ message: 'Logged out successfully' });
};