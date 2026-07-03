import { Payment } from "./payment";

export interface Student {
  id: number;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  payments: Payment[];
};

export const default_student: Student = {
  id: -1,
  email: '',
  phone: '',
  firstName: '',
  lastName: '',
  payments: [],
}

export const sample_students: Student[] = [
    {
        id: 0,
        firstName: 'Eduardo',
        lastName: 'Almanza',
        email: 'eddie@gmail.com',
        phone: '333333333',
        payments: [
          {
            id: 0,
            postDate: new Date(),
            startDate: new Date(),
            monthlyPrice: 50,
            duration: 1,
            student: 0
          }
        ]
      },
      {
        id: 1,
        firstName: 'Octavio',
        lastName: 'Almanza',
        email: 'octavio@gmail.com',
        phone: '111111111',
        payments: [
          {
            startDate: new Date(),
            id: 0,
            postDate: new Date(),
            monthlyPrice: 50,
            duration: 1,
            student: 1
          },
          {
            startDate: new Date(),
            id: 0,
            postDate: new Date(),
            monthlyPrice: 50,
            duration: 1,
            student: 1
          },
          {
            startDate: new Date('2024-06-28T12:00:00Z'),
            id: 0,
            postDate: new Date(),
            monthlyPrice: 50,
            duration: 1,
            student: 1
          }
        ]
      },
      {
        id: 2,
        firstName: 'Dania',
        lastName: 'Almanza',
        email: 'dania@gmail.com',
        phone: '222222222',
        payments: [
          {
            startDate: new Date(),
            id: 0,
            postDate: new Date(),
            monthlyPrice: 50,
            duration: 1,
            student: 2
          },
          {
            startDate: new Date('2025-12-28T12:00:00Z'),
            id: 0,
            postDate: new Date(),
            monthlyPrice: 50,
            duration: 1,
            student: 2
          },
          {
            startDate: new Date('2025-06-28T12:00:00Z'),
            id: 0,
            postDate: new Date(),
            monthlyPrice: 50,
            duration: 1,
            student: 2
          }
        ]
      }
];
