import * as Yup from 'yup';
import TypeForm from '../../../services/TypeForm';

async function IndexValidator(request, response, next) {
    try {
        const schema = Yup.object().shape({
            search: Yup.string().required('Informe o termo de pesquisa.'),
        });

        TypeForm.schema({
            search: 'string',
        });

        await schema.validate(request.query, { abortEarly: false });
        await TypeForm.validate(request.query);

        return next();
    } catch (error) {
        return response.status(400).json({
            message: 'Não foi possível retorna a listagem de veículos.',
            reasons: error.errors,
        });
    }
}

export default IndexValidator;
