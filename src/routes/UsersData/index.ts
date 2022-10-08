import {Router} from 'express';
import { UserData } from '@libs/UserData';
import { IUserData } from '@dao/models/entities/UserData';
import { commonValidator, validateInput } from '@server/utils/validator';

const router = Router();
const userDataInstance = new UserData();

router.get('/',async (_req, res) => {
    try {
        res.json(await userDataInstance.getAllUserData());
    } catch (ex) {
        console.error(ex);
        res.status(503).json({error:ex});
    }
});

router.get('/byindex/:index', async (req, res) => {
  try {
    const { index } = req.params;
    res.json(await userDataInstance.getUserDataById(+index));
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({'msg': 'Error al obtener Registro'});
  }
});

router.get('/byusername/:username', async (req, res) => {
  try {
    const { username } = req.params;
    res.json(await userDataInstance.getUserDataByUserName(username));
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({'msg': 'Error al obtener Registro'});
  }
});

router.post('/new',async (req, res) => {
    try {
        const newUserData = req.body as unknown as IUserData;

        const isValid = ValidateNewValues(newUserData, 'INS');

        if (isValid.length === 0) {

          const newUserDataIndex = await userDataInstance.addUserData(newUserData);

          res.json({newUserIndex: newUserDataIndex});
        }else{
          res.status(400).json({isValid});
        }

    } catch (error) {
        res.status(500).json({error: (error as Error).message});
    }
});

router.put('/update/:id', async (req, res)=>{
    try {
      const { id } = req.params;
      const userDataFromForm = req.body as IUserData;
      
      Object.keys(userDataFromForm).forEach(key =>{
        if(userDataFromForm[key] === "" || userDataFromForm[key] === null){
          delete userDataFromForm[key];
        }
      });

      const isValid = ValidateNewValues(userDataFromForm, 'UPD');
      if (isValid.length === 0) {
          if (await userDataInstance.updateUserData(+id, userDataFromForm)){
            res.status(200).json({"msg":"Usuario Actualizado"});
          } else {
            res.status(404).json({"msg":"Update not posible"});
          }
      } else{
        res.status(400).json({isValid});
      }
    } catch(error) {
      res.status(500).json({error: (error as Error).message});
    }
  });

router.put('/disable/:id', async (req, res)=>{
  try {
    const { id } = req.params;
    
    if (await userDataInstance.disableUserData(+id)) {
      res.status(200).json({"msg":"Usuario Inhabilitado"});
    } else {
      res.status(404).json({"msg":"Disable not posible"});
    }

  } catch(error) {
    res.status(500).json({error: (error as Error).message});
  }
});

router.get('/login', async (req, res)=>{
  try {
    const loginDataFromForm = req.body as IUserData;
    const isValid = await userDataInstance.loginUser(loginDataFromForm);

    if (!isValid) {
      res.status(500).json({error: 'Check your Credentials'});   
    }else{
      res.status(200).json({msg:"Welcome!", validLog: true});
    }
  } catch(error) {
    res.status(500).json({error: (error as Error).message});
  }
});


  function ValidateNewValues (userData: Partial<IUserData>,  mode: 'UPD' | 'INS') {
        /* Validation Schemas */
        const {email, password, username} = userData;

        const validateEmailSchema = commonValidator.email;
        const validatePasswordSchema = commonValidator.password;
        const validateUsernameSchema = commonValidator.username;
        
        validateEmailSchema.required = mode === 'UPD' ? false : true;
        validatePasswordSchema.required = mode === 'UPD' ? false : true;
        validateUsernameSchema.required = mode === 'UPD' ? false : true;


        validateEmailSchema.customValidate = (values) => {return values.includes('unicah.edu');}

        const errors = {length: 0,
          addElem(elem:any) { elem.length > 0 ? [].push.call(this, elem) : null ;}
        };

        errors.addElem((validateInput({email}, [validateEmailSchema])));
        errors.addElem((validateInput({password}, [validatePasswordSchema])));
        errors.addElem((validateInput({username}, [validateUsernameSchema])));

        return errors;
  }


export default router;