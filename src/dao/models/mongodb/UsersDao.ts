import { IUser } from "../entities/User";
import { AbstractDao } from "./AbstractDao";
import {Db} from "mongodb";

export class UsersDao extends AbstractDao<IUser>{
  public constructor(db: Db) {
    super('users', db );
  }
  getUserByEmail(email:string){
    const query = {email};
    return this.findOneByFilter(query);
  }

  public async getAllUsers(){
    try {
      return await this.findAll();
    } catch( ex: unknown) {
      console.log("UsersDao mongodb:", (ex as Error).message);
      throw ex;
    }
  }

  public updateUserStatus(id:string){
    return this.update(id, {updated: new Date()});
  }

  public updateUserFailed(id:string){
    return this.updateRaw(id, {$inc:{failedAttempts:1}, $set:{updated: new Date()}});
  }

  public updateLoginSuccess(id:string){
    const currentDate = new Date();
    return this.update(id, {lastLogin: currentDate, failedAttempts: 0, updated: currentDate})
  }

  public addRoleToUser(id:string, role:string){
    return this.updateRaw(id, 
        //{$push : {roles: role}}
        {$addToSet: {roles:role}}
      );
  }

  public async updateUser(user: Partial<IUser>){
    try {
      const {_id, ...updateObject} = user;

      return await this.update(_id as string, updateObject);
      
    } catch( ex: unknown) {
      console.log("UsersDao mongodb:", (ex as Error).message);
      throw ex;
    }
  }

  public async deleteRecoveryToken(user: Partial<IUser>){
    try {
      const {_id} = user;

      return await this.updateRaw(_id as string, {"$unset":{"passwordChangeToken":""}});
      
    } catch( ex: unknown) {
      console.log("UsersDao mongodb:", (ex as Error).message);
      throw ex;
    }
  }

  createUser(user:IUser){
    const {_id, ...newUser} = user;
    return this.createOne(newUser);
  }
}