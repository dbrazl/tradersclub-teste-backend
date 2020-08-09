import * as Yup from 'yup';
import TypeForm from '../../../services/TypeForm';
import CustomError from '../../../services/CustomError';

async function UpdateValidator(request, response, next) {
    try {
        const { car_id } = request.params;
        const id = parseInt(car_id);

        if (isNaN(id))
            throw new CustomError(['O parâmetro id deve ser um número.']);

        const schema = Yup.object().shape({
            title: Yup.string(),
            model: Yup.string(),
            brand: Yup.string(),
            year: Yup.number(),
            color: Yup.string(),
            km: Yup.number(),
            price: Yup.number(),
        });

        TypeForm.schema({
            title: 'string',
            model: 'string',
            brand: 'string',
            year: 'number',
            color: 'string',
            km: 'number',
            price: 'number',
        });

        await schema.validate(request.body, { abortEarly: false });
        await TypeForm.validate(request.body);

        return next();
    } catch (error) {
        return response.status(400).json({
            message: 'Não foi possível atualizar o veículo.',
            reasons: error.errors,
        });
    }
}

export default UpdateValidator;
