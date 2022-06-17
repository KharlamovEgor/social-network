import {Router} from 'express';
import {routeHandler} from '../../base/base.controller.interface';

export interface ImagesControllerInterface {
  router: Router;
  load: routeHandler;
}
