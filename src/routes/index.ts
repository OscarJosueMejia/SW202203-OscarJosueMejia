import {Router} from 'express';
import CashFlowRouter from './CashFlows';
import UserDataRouter from './UsersData';

const router  = Router();

router.use('/cashflow', CashFlowRouter);
router.use('/userdata', UserDataRouter);

export default router;
