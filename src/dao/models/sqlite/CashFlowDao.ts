import { ICashFlow } from "../entities/CashFlow";
import { AbstractDao } from "./AbstractDao";
import sqlite from 'sqlite';

export class CashFlowDao extends AbstractDao<ICashFlow> {
    
    /* Constructores NO pueden ser Promise */
    public constructor(db:sqlite.Database){
        super('CASHFLOW', db as sqlite.Database);
        super.exec('CREATE TABLE IF NOT EXISTS CASHFLOW(_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,'
         + ' type TEXT,' 
         + ' date TEXT,'
         + ' amount NUMERIC,'
         + ' description TEXT);').then().catch(e=>console.error(e));
    }

    public async getCashFlows() {
       return super.findAll();
    }

    public async insertNewCashFlow(newCashFlow: ICashFlow){
        try {
            const result = await super.createOne(newCashFlow);
            return result;
        } catch (ex:unknown) {
            console.log("CashFlowDao sqlite: ", (ex as Error).message)
            throw ex;
            
        }   
        
    }

    public async updateCashFlow(updateCashFlow: ICashFlow){
        try {
            const {_id, ...updateObject} = updateCashFlow;
            const result = await super.update({_id}, updateObject);
            return result;
        } catch (ex:unknown) {
            console.log("CashFlowDao sqlite: ", (ex as Error).message)
            throw ex;
            
        }   
    }
    
    public async deleteCashFlow(deleteCashFlow: ICashFlow){
        try {
            const {_id} = deleteCashFlow;
            const result = await super.delete({_id});
            return result;
        } catch (ex:unknown) {
            console.log("CashFlowDao  sqlite: ", (ex as Error).message)
            throw ex;
        }   
    }
}