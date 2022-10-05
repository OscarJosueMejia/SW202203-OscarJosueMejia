import { UserData } from './index';
import { IUserData } from "@models/entities/UserData";


describe('UserData Lib Unit Tests', ()=>{
    it('should Create an Instance of UserData', ()=>{
        const userDataInstance = new UserData();
        expect(userDataInstance).toBeDefined();
    });

    it('should Add a new UserData Item', async ()=>{
        const userDataInstance = new UserData();

        const userDataItem : IUserData = {
            firstName: 'Oscar',
            lastName: 'Mejia',
            email: 'mejiaoscar@unicah.edu',
            username: 'mejiasoc',
            password: 'testing21@_2',
            currentStatus: 'ACT',
            createdAt: new Date()
        }

        const index = await userDataInstance.addUserData(userDataItem);
        expect(index).toBe(0);
    });

    it('should Update an UserData Item', async ()=>{
        const userDataInstance = new UserData();
        const id = 1;

        const userDataItem : IUserData = {
            firstName: 'Josue',
            lastName: 'Mejia',
            email: 'mejiaoscar@unicah.edu',
            username: 'mejiasoc2',
            password: 'testing21@_2',
            currentStatus: 'ACT',
            createdAt: new Date()
        }

        const index = await userDataInstance.updateUserData(id, userDataItem);
        expect(index).toBe(true);
    });

});