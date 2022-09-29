import { IDaoObject } from "@server/dao/daoBase";
import sqlite from 'sqlite';

export abstract class AbstractDao<T> implements IDaoObject {
    public persistanceName: string;
    private connection: sqlite.Database;

    constructor(persistanceName: string, connection?: sqlite.Database){
        this.persistanceName = persistanceName;

        if (connection) {
            this.connection = connection;
        }
    }

    public async findAll() : Promise<T[]>{
        const sqlStr = `SELECT * from ${this.persistanceName};`;
        const datos = await this.connection.all(sqlStr);
        return datos;
    };

    public async findByID(identifier: Partial<T>) : Promise<T>{
        const {columns, values, params:_params} = this.getColValParmArr(identifier);
        
        const sqlSelect = `SELECT * from ${this.persistanceName} where ${columns.map(object=>`${object}=?`).join(' and ')}`;
        const dato = await this.connection.get(sqlSelect, values);

        return dato;
    };

    public async createOne(data: T): Promise<T> {
        const {columns, values, params} = this.getColValParmArr(data);

        const sqlInsert = `INSERT INTO ${this.persistanceName} ( ${columns.join(', ')}) VALUES (${params.join(', ')});`;

        await this.connection.exec(sqlInsert, values);
        return data;
    };

    //Partial permite porciones del registro, sin tener la obligación de presentar todos los datos.
    public async update(identifier: Partial<T>, data: Partial<T>):Promise<boolean>{
        //Update Table_Name set ...COLUMNS=?, WHERE ..IDENTIFIERS=?
        const {columns, values, params:_params} = this.getColValParmArr(data);
        const {columns:columnsId, values:valuesId, params:_paramsId} = this.getColValParmArr(identifier);

        const finalValues = {...values, ...valuesId}
        const sqlUpdate = `UPDATE ${this.persistanceName} SET ${columns.map((object)=>`${object}=?`).join(' ')} WHERE ${columnsId.map((object)=>`${object}=?`).join(' ')};`;
    
        await this.connection.exec(sqlUpdate, finalValues);
        return true;
    };


    public async delete(identifier: Partial<T>): Promise<boolean>{
        const {columns, values, params:_params} = this.getColValParmArr(identifier);
        
        const sqlDelete = `DELETE FROM ${this.persistanceName} 
        WHERE ${columns.map(object=>`${object}=?`).join(' and ')};`;

        await this.connection.exec(sqlDelete, values);
        return true;
    };

    public findByFilter(){
        throw new Error("Not Implemented");
    };

    public aggregate(){
        throw new Error("Not Implemented");
    };

    public exec(sqlstr: string){
        return this.connection.exec(sqlstr);
    };

    /* UTILS  */
    private getColValParmArr(data: Partial<T>): {columns:string[], values:unknown[], params:string[]} {
        const columns = Object.keys(data);
        const values = Object.values(data);
        const params = columns.map(()=>'?');

        return {columns, values, params};
    }
}

