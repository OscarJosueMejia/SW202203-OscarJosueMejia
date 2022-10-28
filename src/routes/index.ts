import {Router} from 'express';
import CashFlowRouter from './CashFlows';
import UserDataRouter from './UsersData';
import UsersRouter from './Users';

import apiKeyMW from '@middleware/apiKeyHeaderValidator';
import { jwtValidator } from '@middleware/jwtBearerValidator';

const router  = Router();

router.use('/cashflow', apiKeyMW, jwtValidator, CashFlowRouter);
router.use('/userdata', apiKeyMW, jwtValidator, UserDataRouter);
router.use('/security', apiKeyMW, UsersRouter);

export default router;
