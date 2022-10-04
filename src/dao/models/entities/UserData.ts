export interface IUserData {
    firstName: string,
    lastName: string,
    email: string;
    username: string;
    password: string;
    currentStatus: 'ACT' | 'INA' | 'BLQ';
    createdAt: Date;
    _id?: unknown; //? -> Indica que el campo es opcional
}