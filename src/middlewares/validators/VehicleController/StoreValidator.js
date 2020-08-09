import * as Yup from 'yup';
import TypeForm from '../../../services/TypeForm';

async function StoreValidator(request, response, next) {
    try {
        const schema = Yup.object().shape({
            title: Yup.string().required('Informe o título.'),
            model: Yup.string().required('Informe o modelo.'),
            brand: Yup.string().required('Informe a marca.'),
            year: Yup.number().required('Informe o ano.'),
            color: Yup.string().required('Informe a cor.'),
            km: Yup.number().required('Informe a kilometragem.'),
            price: Yup.number().required('Informe o preço.'),
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

        await schema.validate(request.body.car, { abortEarly: false });
        await TypeForm.validate(request.body.car);

        return next();
    } catch (error) {
        return response.status(400).json({
            message: 'Não foi possível criar o veículo.',
            reasons: error.errors,
        });
    }
}

export default StoreValidator;
