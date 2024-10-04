import Transaction from "../models/Transaction.js";

export const createTransaction = async (transactionData) => {
    const errors = {};

    if (!transactionData.description || transactionData.description.length === 0) {
        errors.description = "Deskripsi tidak boleh kosong.";
    }

    if (!transactionData.amount || isNaN(transactionData.amount)) {
        errors.amount = "Jumlah harus berupa angka.";
    }

    const validTypes = ['income', 'expense'];
    if (!transactionData.type || !validTypes.includes(transactionData.type)) {
        errors.type = `Jenis harus salah satu dari: ${validTypes.join(', ')}.`;
    }

    if (!transactionData.transaction_date || isNaN(Date.parse(transactionData.transaction_date))) {
        errors.transaction_date = "Tanggal transaksi tidak valid.";
    }

    if (Object.keys(errors).length > 0) {
        return { error: true, message: 'Validasi gagal', errors };
    }

    try {
        const transaction = await Transaction.create({
            description: transactionData.description,
            amount: transactionData.amount,
            type: transactionData.type,
            transaction_date: transactionData.transaction_date,
        });

        return {
            error: false,
            data: {
                id: transaction.id,
                description: transaction.description,
                amount: transaction.amount,
                type: transaction.type,
                transaction_date: transaction.transaction_date,
            },
        };
    } catch (error) {
        console.error('Error saat membuat transaksi:', error);
        return { error: true, message: 'Gagal membuat transaksi' };
    }
};

export const updateTransactionService = async (id, updatedData) => {
    try {
        const transaction = await Transaction.findByPk(id);

        if (!transaction) {
            return { error: true, message: 'Transaksi tidak ditemukan' };
        }

        transaction.description = updatedData.description || transaction.description;
        transaction.amount = updatedData.amount || transaction.amount;
        transaction.type = updatedData.type || transaction.type;
        transaction.transaction_date = updatedData.transaction_date || transaction.transaction_date;

        await transaction.save();

        return {
            error: false,
            data: {
                id: transaction.id,
                description: transaction.description,
                amount: transaction.amount,
                type: transaction.type,
                transaction_date: transaction.transaction_date,
            }
        };
    } catch (error) {
        console.error('Error saat memperbarui transaksi:', error);
        return { error: true, message: 'Gagal memperbarui transaksi', errors: error.message };
    }
};

export const getBalance = async () => {
    try {
        const transactions = await Transaction.findAll();

        let balance = 0;
        transactions.forEach(transaction => {
            if (transaction.type === 'income') {
                balance += transaction.amount;
            } else if (transaction.type === 'expense') {
                balance -= transaction.amount;
            }
        });

        return {
            error: false,
            balance: balance,
        };
    } catch (error) {
        console.error('Error saat mengambil balance:', error);
        return { error: true, message: 'Gagal mengambil balance' };
    }
};