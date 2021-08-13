import { TransactionsModel } from "./transactions.model";

export interface TransactionHistoryModel {
    receipeintId: number;
    transactions: TransactionsModel[];
    userId: number;
    
}
