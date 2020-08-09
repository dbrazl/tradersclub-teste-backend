import { Router } from 'express';

import IndexVehicleValidator from '../middlewares/validators/VehicleController/IndexValidator';
import StoreVehicleValidator from '../middlewares/validators/VehicleController/StoreValidator';
import UpdateVehicleValidator from '../middlewares/validators/VehicleController/UpdateValidator';
import VehicleController from '../controllers/VehicleController';

import StoreBrandValidator from '../middlewares/validators/BrandControiler/StoreValidator';
import BrandController from '../controllers/BrandController';

const route = new Router();

route.get('/cars', IndexVehicleValidator, VehicleController.index);
route.post('/cars', StoreVehicleValidator, VehicleController.store);
route.put('/cars/:car_id', UpdateVehicleValidator, VehicleController.update);
route.delete('/cars/:car_id', VehicleController.delete);

route.get('/brands', BrandController.index);
route.post('/brands', StoreBrandValidator, BrandController.store);

export default route;
