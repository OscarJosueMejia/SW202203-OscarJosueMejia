export interface IUserData {
    userName: string;
    email: String;
    password: String;
    currentStatus: 'ACT' | 'INA' | 'BLQ';
    createdAt: Date;
    _id?: unknown; //? -> Indica que el campo es opcional
}