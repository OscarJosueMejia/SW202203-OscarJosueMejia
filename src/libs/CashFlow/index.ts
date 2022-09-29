import { getConnection } from "@server/dao/models/sqlite/SqliteConn";
import { CashFlowDao } from "@server/dao/models/sqlite/CashFlowDao";
/* Estructura de datos inicial */
export interface ICashFlow {
    type: 'INCOME' | 'EXPENSE';
    date: Date;
    amount: number;
    description: String;
}

/* Manejo en memoria de un objeto */
export class CashFlow {
    private dao: CashFlowDao;

    public constructor() {
        getConnection()
        .then(conn => {
            this.dao = new CashFlowDao(conn);
        })
        .catch(ex=>console.error(ex));
    }

    private cashFlowItems: ICashFlow[] = [];

    /* Consultas */
    /**
     * getAllCashFlow
    */
    public getAllCashFlow() {
        // return this.cashFlowItems;

        return this.dao.getCashFlows;
    }

    public getCashFlowByIndex(index:number): ICashFlow {
        if (index >= 0 && index < this.cashFlowItems.length) {
            
            return this.cashFlowItems[index];
        }
        throw Error("Index out of range");
        
    }

    public addCashFlow(cashFlow: ICashFlow ): number {
        const cashFlowExists = this.cashFlowItems.findIndex(
            (obj) => {
                return obj.amount === cashFlow.amount && obj.description === cashFlow.description;
            }
        )
        
        if (cashFlowExists < 0) {
            this.cashFlowItems.push(cashFlow);    
            return this.cashFlowItems.length - 1; 
        }

        throw Error('Error: CashFlow already Exists on Collection.');

    }
    
    public updateCashFlow(index:number, cashFlow:ICashFlow): boolean {
        if (index >= 0 && index < this.cashFlowItems.length) {
            this.cashFlowItems[index] = cashFlow;
            return true;
        }
        return false;
    }

    public deleteCashFlow(index:number):boolean {
        //Agregar _ al inicio de la variable para indicar que no se va usar.
        if (index >= 0 && index < this.cashFlowItems.length) {
            //Usar filter para evitar la mutabilidad de los datos.
            this.cashFlowItems = this.cashFlowItems.filter(
                (_obj: ICashFlow, i:number) => i !== index
            );
            return true;
        }
        return false;
    }
}
