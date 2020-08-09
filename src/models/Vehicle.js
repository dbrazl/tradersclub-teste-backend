import Sequelize, { Model } from 'sequelize';

class Vehicle extends Model {
    static init(sequelize) {
        super.init(
            {
                title: Sequelize.STRING,
                model: Sequelize.STRING,
                brand: Sequelize.STRING,
                year: Sequelize.INTEGER,
                color: Sequelize.STRING,
                km: Sequelize.INTEGER,
                price: Sequelize.DECIMAL,
            },
            {
                sequelize,
            }
        );

        return this;
    }
}

export default Vehicle;
