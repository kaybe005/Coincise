import Transaction from '../models/transactionModel.js';

export const createTransaction = async (req, res) => {
    try {
        const transaction = new Transaction(req.body);
        await transaction.save();
        res.status(201).json(transaction);
    }
    catch (err) {
        console.error('Error adding transaction:', err);
        res.status(500).json({ error: 'Failed to create transaction' });
    }
};

export const getTransactions = async (req, res) => {
    try {
        const { userEmail } = req.params;
        const transactions = await Transaction.find({ userEmail }).sort({ date: -1 });
        res.status(200).json(transactions);
    }
    catch (err) {
        console.error('Error fetching transactions:', err);
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
};

export const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        await Transaction.findByIdAndDelete(id);
        res.status(200).json({ message: 'Transaction deleted' });
    }
    catch (err) {
        console.error('Error deleting transaction:', err);
        res.status(500).json({ error: 'Failed to delete transaction' });
    }
};