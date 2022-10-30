import express from 'express';
const router = express.Router();
import {Users} from  '@libs/Users';

const users = new Users();

router.get('/getAll', async (_req, res)=> {
  try {
    const result = await users.getAllUsers();
    res.status(200).json(result);
  } catch(ex) {
    console.log("Error:", ex);
    res.status(500).json({error:"Error al crear usuario"});
  }
});

router.post('/signin', async (req, res)=> {
  try {
    const {name, email, password} = req.body;
    const result = await users.signin(name, email, password);
    console.log("SIGNIN:", result);
    res.status(200).json({"msg":"Usuario Creado Correctamente"});
  } catch(ex) {
    console.log("Error:", ex);
    res.status(500).json({error:"Error al crear usuario"});
  }
});

router.post('/login', async (req, res)=> {
  try {
    const {email, password} = req.body;
    const result = await users.login(email, password);

    console.log("LOGIN:", result);
    res.status(200).json(result);

  } catch(ex) {
    console.log("Error:", ex);
    res.status(403).json({error:"Credenciales no son válidas"});
  }
});

router.post('/changePassword', async (req, res)=> {
  try {
    const {email, oldPassword, newPassword} = req.body;

    await users.changePassword(email, oldPassword, newPassword);

    res.status(200).json({"msg":"Contraseña Actualizada"})

  } catch(error) {
    console.log("Error:", error);
    res.status(403).json({error: (error as Error).message});
  }
});

router.post('/generateRecoveryPin', async (req, res)=> {
  try {
    const {email} = req.body;
    const result = await users.generateRecoveryCode(email);

    res.status(200).json(result);

  } catch(error) {
    console.log("Error:", error);
    res.status(403).json({error: (error as Error).message});
  }
});

router.post('/recoveryChangePassword', async (req, res)=> {
  try {
    const {email, pin, newPassword} = req.body;

    await users.verifyRecoveryData(email, pin, newPassword);
    res.status(200).json({"msg":"Contraseña Actualizada"})

  } catch(error) {
    console.log("Error:", error);
    res.status(403).json({error: (error as Error).message});
  }
});

export default router;