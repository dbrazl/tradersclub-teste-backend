import _ from 'lodash';
import CustomError from './CustomError';

class TypeForm {
  constructor() {
    this.types = null;
  }

  static schema(types) {
    this.types = types;
  }

  static validate(body) {
    const entries = Object.entries(body);
    const typesEntries = Object.entries(this.types);

    let errors = [];
    let throwError = false;

    let bodyKeys = [],
      typesKeys = [];

    for (const [key] of entries) bodyKeys.push(key);

    for (const [key] of typesEntries) typesKeys.push(key);

    const dif = _.difference(bodyKeys, typesKeys);

    for (const value of dif) {
      const message = `O campo "${value}" não faz parte do esquema de validação.`;
      errors.push(message);
      throwError = true;
    }

    for (const [key, value] of entries) {
      if (this.types[`${key}`] !== typeof value && this.types[`${key}`]) {
        const message = `O tipo do campo ${key} é um ${typeof value}.`;
        errors.push(message);
        throwError = true;
      }
    }

    if (throwError) throw new CustomError(errors);

    return true;
  }

  static required(object) {
    const objectEntries = Object.entries(object);
    const typesEntries = Object.entries(this.types);

    let errors = [];
    let throwError = false;

    for (let i = 0; i < objectEntries.length; i++)
      if (typesEntries[i][0] !== objectEntries[i][0]) {
        const message = `Informe o ${typesEntries[i][0]}.`;
        errors.push(message);
        throwError = true;
      }

    if (throwError) return new CustomError(errors);

    return true;
  }
}

export default TypeForm;
