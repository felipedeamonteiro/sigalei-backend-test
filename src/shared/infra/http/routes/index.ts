import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import commitsRouter from '@modules/users/infra/http/routes/commits.routes';

const routes = Router();

routes.use('/', usersRouter);
routes.use('/commits', commitsRouter);

export default routes;
