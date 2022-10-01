export interface ICashFlow {
    type: 'INCOME' | 'EXPENSE';
    date: Date;
    amount: number;
    description: String;
    _id?: unknown; //? -> Indica que el campo es opcional
}
