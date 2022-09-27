import { IDaoObject } from "@server/dao/daoBase";

export abstract class AbstractDao implements IDaoObject {
    private persistanceName: string;
    
    constructor(persistanceName: string, connection?: unknown){
        this.persistanceName = persistanceName;
    }

    
    protected findAll(){
        throw new Error("Not Implemented");
    };

    protected findByID(id){
        throw new Error("Not Implemented");
    };

    protected update(){
        throw new Error("Not Implemented");
    };

    protected delete(){
        throw new Error("Not Implemented");
    };

    protected findByFilter(){
        throw new Error("Not Implemented");
    };

    protected aggregate(){
        throw new Error("Not Implemented");
    };
}