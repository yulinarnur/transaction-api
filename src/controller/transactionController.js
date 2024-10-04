import Transaction from '../models/Transaction.js';
import { createTransaction, updateTransactionService, getBalance  } from '../services/transactionService.js';
import { sendResponse, sendErrResponse } from '../utils/responseUtils.js';

export const createTransactionController = async (req, res) => {
    const transactionData = req.body;

    const result = await createTransaction(transactionData);

    if (result.error) {
        return sendErrResponse(res, 400, result.message, result.errors);
    }

    return sendResponse(res, 201, 'Transaksi berhasil dibuat', result.data);
};

export const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.findAll();
        return res.status(200).json({
            message: 'Daftar semua transaksi',
            data: transactions,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil transaksi', error: error.message });
    }
};

export const getTransactionById = async (req, res) => {
    const { id } = req.params; 

    try {
        const transaction = await Transaction.findByPk(id); 
        if (!transaction) {
            return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
        }

        return res.status(200).json({ message: 'Detail transaksi', data: transaction });
    
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil transaksi', error: error.message });
    }
};

export const updateTransactionController = async (req, res) => {
    const { id } = req.params;  
    const transactionData = req.body;

    try {
        const result = await updateTransactionService(id, transactionData);

        if (result.error) {
            return sendErrResponse(res, 400, result.message, result.errors);
        }

        return sendResponse(res, 200, 'Transaksi berhasil diperbarui', result.data);
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui transaksi', errors: error.message });
    }
};

export const getBalanceController = async (req, res) => {
    const result = await getBalance();

    if (result.error) {
        return sendErrResponse(res, 500, result.message);
    }

    return sendResponse(res, 200, 'Balance berhasil diambil', { balance: result.balance });
};