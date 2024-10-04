import express from 'express';
import { 
    createTransactionController, 
    getAllTransactions, 
    getTransactionById, 
    updateTransactionController, 
    getBalanceController
} from '../controller/transactionController.js'; 

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Transactions
 */

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary:
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: "Pemasukan gaji"
 *               amount:
 *                 type: integer
 *                 example: 5000000
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *                 example: "income"
 *               transaction_date:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-04"
 *     responses:
 *       201:
 *         description: Transaksi berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Transaksi berhasil dibuat"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     description:
 *                       type: string
 *                     amount:
 *                       type: integer
 *                     type:
 *                       type: string
 *                     transaction_date:
 *                       type: string
 *                       format: date
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary:
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: Daftar semua transaksi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       description:
 *                         type: string
 *                       amount:
 *                         type: integer
 *                       type:
 *                         type: string
 *                       transaction_date:
 *                         type: string
 *                         format: date
 */

/**
 * @swagger
 * /transactions/{id}:
 *   get:
 *     summary: 
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID transaksi
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detail transaksi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     description:
 *                       type: string
 *                     amount:
 *                       type: integer
 *                     type:
 *                       type: string
 *                     transaction_date:
 *                       type: string
 *                       format: date
 *       404:
 *         description: Transaksi tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan pada server
 */

/**
 * @swagger
 * /transactions/{id}:
 *   put:
 *     summary:
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID transaksi yang akan diperbarui
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               transaction_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Transaksi berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Transaksi berhasil diperbarui"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     description:
 *                       type: string
 *                     amount:
 *                       type: integer
 *                     type:
 *                       type: string
 *                     transaction_date:
 *                       type: string
 *                       format: date
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Transaksi tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan pada server
 */

/**
 * @swagger
 * /balance:
 *   get:
 *     summary: 
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: Balance berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Balance berhasil diambil"
 *                 data:
 *                   type: object
 *                   properties:
 *                     balance:
 *                       type: number
 *                       example: 1500000
 *       500:
 *         description: Internal Server Error
 */


router.post('/api/transactions', createTransactionController);
router.get('/transactions', getAllTransactions);
router.get('/transactions/:id', getTransactionById);
router.put('/transactions/:id', updateTransactionController);
router.get('/balance', getBalanceController);

export default router;
