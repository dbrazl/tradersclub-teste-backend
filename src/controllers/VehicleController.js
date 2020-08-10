import Sequelize from 'sequelize';
import Vehicle from '../models/Vehicle';
import Brand from '../models/Brand';

class VehicleController {
    async index(request, response) {
        const { search } = request.query;

        const Op = Sequelize.Op;

        const cars = await Vehicle.findAll({
            where: { title: { [Op.iLike]: `%${search}%` } },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        });

        if (cars.length <= 0)
            return response.status(404).json({
                message: 'Não foi possível retornar a listagem.',
                reasons: 'Não há veículos cadastrados.',
            });

        return response.status(200).json({
            cars,
        });
    }

    async store(request, response) {
        const { title, brand: name } = request.body.car;

        const finded = await Vehicle.findOne({ where: { title } });
        if (finded)
            return response.status(401).json({
                message: 'Não foi possível criar o veículo.',
                reasons: ['O carro já foi cadastrado.'],
            });

        const brand = await Brand.findOne({ where: { name } });
        if (!brand)
            return response.status(401).json({
                message: 'Não é possível criar o veículo.',
                reasons: ['A marca informada não está cadastrada.'],
            });

        const created = await Vehicle.create(request.body.car);

        return response.status(201).json({
            car: { id: created.id, ...request.body.car },
        });
    }

    async update(request, response) {
        const { car_id } = request.params;

        const vehicle = await Vehicle.findByPk(car_id);
        if (!vehicle)
            return response.status(401).json({
                message: 'Não foi possível atualizar o veículo.',
                reasons: ['O veículo não existe.'],
            });

        const {
            id,
            title,
            model,
            brand,
            year,
            color,
            km,
            price,
        } = await await vehicle.update(request.body.car);

        return response
            .status(200)
            .json({ id, title, model, brand, year, color, km, price });
    }

    async delete(request, response) {
        const { car_id } = request.params;

        const finded = await Vehicle.findByPk(car_id);
        if (!finded)
            return response.status(401).json({
                message: 'Não foi possível deletar o veículo.',
                reasons: ['O veículo não existe.'],
            });

        await Vehicle.destroy({ where: { id: finded.id } });

        return response.status(200).json({
            car: {
                id: finded.id,
                title: finded.title,
                model: finded.model,
                brand: finded.brand,
                year: finded.year,
                color: finded.color,
                km: finded.km,
                price: finded.price,
            },
        });
    }
}

export default new VehicleController();
