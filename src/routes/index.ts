import {Router} from 'express';
import CashFlowRouter from './CashFlows';

const router  = Router();

router.use('/cashflow', CashFlowRouter);

export default router;
