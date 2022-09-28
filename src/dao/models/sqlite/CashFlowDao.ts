import { ICashFlow } from "../entities/CashFlow";
import { AbstractDao } from "./AbstractDao";

export class CashFlowDao extends AbstractDao<ICashFlow> {
    public async getCashFlows() {
        super.findAll();
    }

    public async insertNewCashFlow(newCashFlow: ICashFlow){
        try {
            const result = await super.createOne(newCashFlow);
            return result;
        } catch (ex:unknown) {
            console.log("CashFlowDao sqlite: ", (ex as Error).message)
            
        }   
        
    }

    public async updateCashFlow(updateCashFlow: ICashFlow){
        try {
            const {_id, ...updateObject} = updateCashFlow
            const result = await super.update({_id}, updateObject);
            return result;
        } catch (ex:unknown) {
            console.log("CashFlowDao sqlite: ", (ex as Error).message)
            
        }   
        
    }
}