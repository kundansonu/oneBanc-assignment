import { CustomerModel } from "./customer.model";

export interface TransactionsModel {
    amount: number;
    customer: CustomerModel;
    description: string;
    direction: number;
    endDate: Date;
    id: number;
    partner: CustomerModel;
    startDate: Date;
    status: number;
    type: number;
}
