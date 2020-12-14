import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import getUsersInLinuxRepoService from '@modules/users/services/getUsersInLinuxRepoService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createUser = container.resolve(getUsersInLinuxRepoService);

    const user = await createUser.execute();

    return response.json(classToClass(user));
  }
}
