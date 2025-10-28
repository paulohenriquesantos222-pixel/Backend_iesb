const yup = require('yup');

const livroSchema = yup.object().shape({
  titulo: yup.string().required('Título é obrigatório'),
  autor: yup.string().required('Autor é obrigatório'),
  editora: yup.string().required('Editora é obrigatória'),
  ano: yup.number()
    .required('Ano é obrigatório')
    .integer('Ano deve ser um número inteiro')
    .min(1000, 'Ano deve ser maior que 1000')
    .max(new Date().getFullYear(), 'Ano não pode ser maior que o ano atual'),
  preco: yup.number()
    .required('Preço é obrigatório')
    .positive('Preço deve ser um número positivo'),
});

const livroUpdateSchema = yup.object().shape({
  titulo: yup.string(),
  autor: yup.string(),
  editora: yup.string(),
  ano: yup.number()
    .integer('Ano deve ser um número inteiro')
    .min(1000, 'Ano deve ser maior que 1000')
    .max(new Date().getFullYear(), 'Ano não pode ser maior que o ano atual'),
  preco: yup.number().positive('Preço deve ser um número positivo'),
});

const validateLivro = async (req, res, next) => {
  try {
    await livroSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json({ errors: error.errors });
  }
};

const validateLivroUpdate = async (req, res, next) => {
  try {
    await livroUpdateSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json({ errors: error.errors });
  }
};

module.exports = { validateLivro, validateLivroUpdate };
