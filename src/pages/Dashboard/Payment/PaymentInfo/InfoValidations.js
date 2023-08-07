const validations = {
  name: {
    custom: {
      isValid: (value) => isValidString(value),
      message: 'Digite um nome válido',
    },
  },

  card: {
    custom: {
      isValid: (value) => parseInt(value?.replaceAll(' ', '')?.length, 10) === 16,
      message: 'Digite um cartão válido',
    },
  },

  valid: {
    custom: {
      isValid: (value) => {
        if (!value || value.length !== 5) {
          return false;
        }
  
        const [month, year] = value.split('/');
        const numericMonth = parseInt(month, 10);
        const numericYear = parseInt(year, 10);
  
        return numericMonth >= 1 && numericMonth <= 12 && numericYear >= 0 && numericYear <= 99;
      },
      message: 'Digite uma data de validade válida (MM/AA).',
    },
  },

  cvc: {
    custom: {
      isValid: (value) => parseInt(value?.length, 10) === 3,
      message: 'Digite um número válido',
    },
  },
};

export default validations;

function isValidString(value) {
  return value || value?.trim();
}
