import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js'; 

const Transaction = sequelize.define('transaction', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT, 
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('income', 'expense'), 
        allowNull: false,
    },
    transaction_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
}, {
    timestamps: false, 
    tableName: 'transaction', 
});

export default Transaction;
