import {Router} from 'express';
import CashFlowRouter from './CashFlows';
import UserDataRouter from './UsersData';
import UsersRouter from './Users';

import apiKeyMW from '@middleware/apiKeyHeaderValidator';

const router  = Router();

router.use('/cashflow', apiKeyMW, CashFlowRouter);
router.use('/userdata', apiKeyMW, UserDataRouter);
router.use('/security', apiKeyMW, UsersRouter);

export default router;
