import { Package } from "./package";

export interface Payment {
    id: number;
    postDate: Date;
    startDate: Date;
    monthlyPrice: number;
    duration: number;
    student: number;
};

export const default_payment: Payment = {
    id: -1,
    startDate: new Date(),
    postDate: new Date(),
    monthlyPrice: 50,
    duration: 1,
    student: -1
}

export const payment_plans: Package[] = [
    {
        id: -1,
        planName: 'Monthly',
        monthlyPrice: 50,
        duration: 1
    },
    {
        id: -1,
        planName: 'Annual',
        monthlyPrice: 30,
        duration: 12
    },
    {
        id: -1,
        planName: 'Trimester',
        monthlyPrice: 40,
        duration: 3
    },
];
