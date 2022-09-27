export interface IDaoObject {
    persistanceName: string;
    findAll: Function;
    findByID: Function;
    update: Function;
    delete: Function;
    findByFilter: Function;
    aggregate: Function;
}