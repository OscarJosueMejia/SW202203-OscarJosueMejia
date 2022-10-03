import { IUserData } from "../entities/UserData";
import { AbstractDao } from "./AbstractDao";
import sqlite from 'sqlite';

const bcrypt = require("bcrypt");

export class UserDataDao extends AbstractDao<IUserData> {

    public constructor(db:sqlite.Database){
        super('USERDATA', db as sqlite.Database);

        super.exec('CREATE TABLE IF NOT EXISTS USERDATA ('
        + ' _id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,'
        + ' userName TEXT,'
        + ' email TEXT,'
        + ' password TEXT,'
        + ' currentStatus TEXT,'
        + ' createdAt TEXT);').then().catch(e=>console.error(e));
    }

    public async getUsersData(){
        return super.findAll();
    }

    public async getUserDataById(identifier : Partial<IUserData>){
        try {
            const result = await super.findByID(identifier);
            return result;

        } catch (ex: unknown) {
            console.log("UserDataDao sqlite: ", (ex as Error).message);
            throw ex;
        }
    }

    public async getUserDataByUserName(userName : string){
        try {
            const result = await super.findByUserName({userName:userName});
            return result;

        } catch (ex: unknown) {
            console.log("UserDataDao sqlite: ", (ex as Error).message);
            throw ex;
        }
    }

    public async insertNewUserData(newUserData : IUserData){
        try {
            const {password, ...otherData} = newUserData;
            const defaultSettings = {password: await bcrypt.hash(password, 10)};

            const result = await super.createOne({...otherData, ...defaultSettings});
            return result;
        } catch (ex: unknown) {
            console.log("UserDataDao sqlite: ", (ex as Error).message);
            throw ex;
        }
    }

    public async updateUserData(identifier: number, updateUserData : IUserData){
        try {
            const {password, ...updateObject} = updateUserData;
            const defaultSettings = {password: await bcrypt.hash(password, 10)};

            const result = await super.update({_id:identifier}, {...updateObject, ...defaultSettings});

            return result;
        } catch (ex: unknown) {
            console.log("UserDataDao sqlite: ", (ex as Error).message);
            throw ex;
        }
    }

 
}