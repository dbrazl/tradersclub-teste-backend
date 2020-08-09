import * as Yup from 'yup';
import TypeForm from '../../../services/TypeForm';

async function StoreValidator(request, response, next) {
    try {
        const schema = Yup.object().shape({
            name: Yup.string().required('Informe o nome.'),
        });

        TypeForm.schema({
            name: 'string',
        });

        await schema.validate(request.body, { abortEarly: false });
        await TypeForm.validate(request.body);

        return next();
    } catch (error) {
        return response.status(400).json({
            message: 'Não foi possível criar a marca.',
            reasons: error.errors,
        });
    }
}

export default StoreValidator;
