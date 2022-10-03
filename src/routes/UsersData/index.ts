import {Router} from 'express';
import { UserData } from '@libs/UserData';
import { IUserData } from '@dao/models/entities/UserData';
// import { commonValidator, validateInput } from '@server/utils/validator';

const router = Router();
const userDataInstance = new UserData();
const bcrypt = require('bcrypt');

router.get('/',async (_req, res) => {
    try {
        res.json(await userDataInstance.getAllUserData());
    } catch (ex) {
        console.error(ex);
        res.status(503).json({error:ex});
    }
});

router.get('/byusername/:userName', async (req, res) => {
  try {
    const { userName } = req.params;
    res.json(await userDataInstance.getUserDataByUserName(userName));
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({'msg': 'Error al obtener Registro'});
  }
});

router.post('/new',async (req, res) => {
    try {
        const newUserData = req.body as unknown as IUserData;
        const newUserDataIndex = await userDataInstance.addUserData(newUserData);
        
        res.json({newUserIndex: newUserDataIndex});
    } catch (error) {
        res.status(500).json({error: (error as Error).message});
        
    }
});

router.put('/update/:id', async (req, res)=>{
    try {
      const { id } = req.params;
      const userDataFromForm = req.body as IUserData;
    
      // const cashFlowUpdate = {...cashFlowInstance.getCashFlowByIndex(index), ...cashFlowFromForm};
      if (await userDataInstance.updateUserData(+id, userDataFromForm)){
        res.status(200).json({"msg":"Usuario Actualizado"});
      } else {
        res.status(404).json({"msg":"Update not posible"});
      }
    } catch(error) {
      res.status(500).json({error: (error as Error).message});
    }
  });

  router.get('/login', async (req, res)=>{
    try {
      const userDataFromForm = req.body as IUserData;

      //MOVER ESTO A LIBS O AL DAO
      const findUserData = await userDataInstance.getUserDataByUserName(userDataFromForm.userName);

      if (!findUserData) {
        res.status(500).json({error: 'Check your Credentials'});   
      }else{
        if ( bcrypt.compareSync(userDataFromForm.password, findUserData.password) ) {
          console.log('PASSWORDS MATCH - PROCEED WITH LOGIN');
          res.json(findUserData);
        }else{
          res.status(500).json({error: 'Check your Credentials'});
        }
      }
    } catch(error) {
      res.status(500).json({error: (error as Error).message});
    }
  });



export default router;