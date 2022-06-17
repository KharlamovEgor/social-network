import {NextFunction, Request, Response} from 'express';
import {writeFile} from 'fs/promises';
import {injectable} from 'inversify';
import {join} from 'path';
import {BaseController} from '../../base/base.controller';
import {ImagesControllerInterface} from './images.controller.interface';

@injectable()
export class ImagesController
  extends BaseController
  implements ImagesControllerInterface
{
  constructor() {
    super();

    this.bindRoutes([
      {
        path: '/load',
        method: 'post',
        func: this.load,
      },
    ]);
  }

  async load(req: Request, res: Response, next: NextFunction): Promise<void> {
    res.json(req.body);
    await writeFile(join(__dirname, '../../', 'images/image.png'), req.body);
  }
}
