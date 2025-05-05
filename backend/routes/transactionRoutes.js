import express from "express";

import { getTransactions, createTransaction, deleteTransaction } from "../controllers/transactionController.js";


const router = express.Router();

router.post('/', createTransaction);
router.get('/:userEmail', getTransactions);
router.delete('/:id', deleteTransaction);

export default router;