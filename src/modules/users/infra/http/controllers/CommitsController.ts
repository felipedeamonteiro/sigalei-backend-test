import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import getCommitsByUserService from '@modules/users/services/getCommitsByUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createCommit = container.resolve(getCommitsByUserService);

    const commit = await createCommit.execute();

    return response.json(classToClass(commit));
  }
}
