import { Router } from 'express';

import CommitsController from '../controllers/CommitsController';

const commitsRoutes = Router();
const commitsController = new CommitsController();

commitsRoutes.post('', commitsController.create);

export default commitsRoutes;
