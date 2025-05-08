import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import dotenv from 'dotenv';
import Transaction from '../models/transactionModel.js';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    const mockTransactions = [
      {
        type: "expense",
        category: "Food",
        amount: 20.5,
        date: new Date(),
        description: "Welcome snack",
        userEmail: email,
      },
      {
        type: "income",
        category: "Salary",
        amount: 4835,
        date: new Date(),
        description: "Palantir Technologies",
        userEmail: email,
        
      },
      {
        type: "expense",
        category: "Bills",
        amount: 280,
        date: new Date(),
        description: "Electricity & Water Bill",
        userEmail: email,
      },
      {
        type: "expense",
        category: "Other",
        amount: 955,
        date: new Date(),
        description: "GTA VI",
        userEmail: email,
      }
    ];
    await Transaction.insertMany(mockTransactions);

    const token = jwt.sign({ id: user._id, email }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ token, user: { id: user._id, name, email } });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const loginUser = async (req, res) => {
    const { email, password} = req.body;
    try {
        const user = await User.findOne({ email});
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
        console.log("JWT_SECRET inregister:", JWT_SECRET);
        const token = jwt.sign({ id: user._id, name: user.name, email} , JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: user._id, name: user.name, email} });
    }
    catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};