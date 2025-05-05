import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: 'Email already in use' });

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashed });

        const token = jwt.sign({ id: user._id, email}, JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({ token, user: { id: user._id, name, email} });
        } 
    catch (error) {
            res.status(500).json({ error: 'Registration failed' });
        }
};

export const loginUser = async (req, res) => {
    const { email, password} = req.body;
    try {
        const user = await User.findOne({ email});
        if (!user) return res.status(404).json({ error: 'User not found' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, name: user.name, email} , JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: user._id, name: user.name, email} });
    }
    catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};
