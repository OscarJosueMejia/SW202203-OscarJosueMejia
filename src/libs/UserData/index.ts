import { getConnection } from "@models/sqlite/SqliteConn";
import { UserDataDao } from "@models/sqlite/UserDataDao";
import { IUserData } from "@models/entities/UserData";

export class UserData {
    private dao: UserDataDao;
    public constructor(){
        getConnection().then(conn=>{
            this.dao = new UserDataDao(conn);
        })
        .catch(ex => console.error(ex));
    }
    
    //Consultas
    public getAllUserData(){
        return this.dao.getUsersData();
    }

    public getUserDataById(index : number){
        return this.dao.getUserDataById({_id:index});
    }

    public getUserDataByUserName(identifier : string){
        return this.dao.findByUserName({username:identifier});
    }

    public addUserData(userData: IUserData){
        return this.dao.insertNewUserData(userData);
    }

    public updateUserData(index: number, userData: IUserData){
        return this.dao.updateUserData(index, userData);
    }


}