const express = require('express');
const Livro = require('../models/Livro');
const LivroValidator = require('../validators/LivroValidator');
const IDValidator = require('../validators/IDValidator');

const router = express.Router();

// POST /livros - criar livro
router.post('/livros', LivroValidator.validateCreate, async (req, res) => {
    try {
        const livro = new Livro(req.body);
        await livro.save();
        res.status(201).json(livro);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET /livros - listar todos os livros
router.get('/livros', async (req, res) => {
    try {
        const livros = await Livro.find();
        res.status(200).json(livros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /livros/:id - buscar livro por ID
router.get('/livros/:id', IDValidator.validateID, async (req, res) => {
    try {
        const livro = await Livro.findById(req.params.id);
        if (!livro) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
        res.status(200).json(livro);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /livros/:id - atualizar livro
router.put('/livros/:id', IDValidator.validateID, LivroValidator.validateUpdate, async (req, res) => {
    try {
        const livro = await Livro.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!livro) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
        res.status(200).json(livro);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE /livros/:id - remover livro
router.delete('/livros/:id', IDValidator.validateID, async (req, res) => {
    try {
        const livro = await Livro.findByIdAndDelete(req.params.id);
        if (!livro) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;