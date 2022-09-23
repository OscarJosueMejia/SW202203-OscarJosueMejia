import { ICashFlow, CashFlow } from "@server/libs/CashFlow";
import { Router } from "express";

const router = Router();
const cashFlowInstance = new CashFlow();

router.get('/', (_req, res) => {
    res.json(cashFlowInstance.getAllCashFlow());
});

router.get('/byIndex/:index', (req, res) => {
    try {
        const { index } = req.params as unknown as {index:number};    
        res.json(cashFlowInstance.getCashFlowByIndex(index));
    
    } catch (error) {
        console.log("-- Error: ", error);
        res.status(500).json({'msg':'Error al obtener Registro'});
    }
});


router.post('/new', (req, res)=>{
    //Conversión de Datos
    try {
      const newCashFlow = req.body as unknown as ICashFlow;
      const newCashFlowIndex = cashFlowInstance.addCashFlow(newCashFlow);

      res.json({newIndex: newCashFlowIndex})
  
    } catch (error) {
      res.status(500).json({error: (error as Error).message});  
    }
  
  });
  
  // Variables en URL
  router.put('/update/:index', (req, res)=>{
    try {
        const { index = -1 } = req.params as unknown as {index?:number};
        
        const cashFlowFromForm = req.body as ICashFlow;
        
        // const cashFlowUpdate = Object.assign(
        //     cashFlowInstance.getCashFlowByIndex(index), cashFlowFromForm);

        const cashFlowUpdate = {...cashFlowInstance.getCashFlowByIndex(index), ...cashFlowFromForm}
       
        if (cashFlowInstance.updateCashFlow(index, cashFlowUpdate)) {
            res.json(cashFlowUpdate);
        }else{
            res.status(404).json({"msg":"Update not Possible"});
        }

    } catch (error) {
        res.status(500).json({error: (error as Error).message});  

    }
  });
  
  
  router.put('/delete/:index', (req, res)=>{
    try {
        const { index = -1 } = req.params as unknown as {index?:number};
        
        if ( cashFlowInstance.deleteCashFlow(index) ) {
            res.status(200).json({"msg":"Registro Eliminado"});
        }else{
            res.status(500).json({"msg":"Error al Eliminar el Registro"});
        }

    } catch (error) {
        res.status(500).json({error: (error as Error).message});  

    }
    
  });
  


export default router;