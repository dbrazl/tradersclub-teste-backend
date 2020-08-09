import Brand from '../models/Brand';

class BrandController {
    async index(request, response) {
        const brands = await Brand.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        });

        if (brands.length <= 0)
            return response.status(401).json({
                message: 'Não é possível retornar a listagem de marcas.',
                reasons: ['Não há marcas cadastradas.'],
            });

        return response.status(200).json({
            brands,
        });
    }

    async store(request, response) {
        const { name } = request.body;

        const brand = await Brand.findOne({ where: { name } });
        if (brand)
            return response.status(401).json({
                message: 'Não foi possível criar a marca.',
                reasons: ['A marca já está cadastrada.'],
            });

        const { id } = await Brand.create({ name });

        return response.status(201).json({
            id,
            name,
        });
    }
}

export default new BrandController();
