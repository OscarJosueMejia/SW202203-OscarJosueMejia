import { getConnection } from "@models/mongodb/MongoDBConn";
import { UsersDao  } from "@models/mongodb/UsersDao";
import { getPassword, checkPassword } from "@utils/crypto";
import { sign } from '@utils/jwt';

export class Users {
  private dao: UsersDao;
  public constructor(){
    getConnection()
      .then(conn=>{
        this.dao = new UsersDao(conn);
      })
      .catch(ex=>console.error(ex));
  }
  public signin(name: string, email:string, password: string){
    const newUser = {
      name,
      email,
      password: getPassword(password),
      status: 'ACT',
      oldPasswords: [] as string[],
      created: new Date(),
      updated: new Date(),
      avatar:'',
      _id: null
    };
    return this.dao.createUser(newUser);
  }

  public async login(email: string, password: string) {
    try {
        const user = await this.dao.getUserByEmail(email);
        if(!!!user){
            console.log("LOGIN: USER NOT FOUND", `${user.email}`)     
             throw new Error("LOGIN USER NOT FOUND");
        }

        if (user.status !== "ACT") {
           console.log("LOGIN: STATUS NOT ACTIVE", `${user.email} - ${user.status}`)     
            throw new Error("LOGIN STATUS INVALID");
        }
        if (!checkPassword(password, user.password)) {
            console.log("LOGIN: INVALID PASSWORD", `${user.email} - ${user.status}`)     
            throw new Error("LOGIN INVALID PASSWORD");
        }
        //Generate jwt
        const {name, email:emailUser, avatar, _id} = user;
        const returnUser = {name, email:emailUser, avatar, _id};
        return {...returnUser, token: sign(returnUser)}
    } catch (error) {
        console.log("LOGIN: ", error);
        throw error;
    }
  }
}