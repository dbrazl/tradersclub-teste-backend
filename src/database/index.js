import Sequelize from 'sequelize';

import config from '../config/database';

import Vehicle from '../models/Vehicle';
import Brand from '../models/Brand';

const models = [Vehicle, Brand];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(config);

        models
            .map((model) => model.init(this.connection))
            .map(
                (model) =>
                    model.associate && model.associate(this.connection.models)
            );
    }
}

export default new Database();
