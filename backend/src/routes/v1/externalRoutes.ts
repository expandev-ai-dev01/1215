import { Router } from 'express';
import * as investmentSimulationController from '@/api/v1/external/investment-simulation/controller';

const router = Router();

router.post('/investment-simulation', investmentSimulationController.postHandler);

export default router;
