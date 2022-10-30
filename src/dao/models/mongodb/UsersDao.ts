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

  updateUserStatus(){}

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