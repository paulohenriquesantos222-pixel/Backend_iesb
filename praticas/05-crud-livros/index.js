const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
app.use(express.json())

const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_HOST = process.env.DB_HOST
const DB_NAME = process.env.DB_NAME

const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(url)
  .then(() => console.log("Conectado ao MongoDB Atlas"))
  .catch(err => console.error("Erro ao conectar no MongoDB:", err))

const LivroModel = mongoose.model('Livros', new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  editora: { type: String, required: true },
  ano: { type: Number, required: true },
  preco: { type: Number, required: true },
  dataCriacao: { type: Date, default: Date.now }
}))

app.post('/livros', async (req, res) => {
  try {
    const livro = req.body
    if (!livro.titulo || !livro.autor || !livro.editora || !livro.ano || !livro.preco) {
      return res.status(400).json({ erro: "Todos os campos são obrigatórios!" })
    }
    const novoLivro = await LivroModel.create(livro)
    res.status(201).json(novoLivro)
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao criar livro" })
  }
})

app.get('/livros', async (req, res) => {
  try {
    const livros = await LivroModel.find()
    res.json(livros)
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar livros" })
  }
})

app.get('/livros/:id', async (req, res) => {
  try {
    const livro = await LivroModel.findById(req.params.id)
    if (!livro) return res.status(404).json({ erro: "Livro não encontrado!" })
    res.json(livro)
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar livro" })
  }
})

app.put('/livros/:id', async (req, res) => {
  try {
    const livro = req.body
    if (!livro.titulo || !livro.autor || !livro.editora || !livro.ano || !livro.preco) {
      return res.status(400).json({ erro: "Todos os campos são obrigatórios!" })
    }
    const livroAtualizado = await LivroModel.findByIdAndUpdate(req.params.id, livro, { new: true })
    if (!livroAtualizado) return res.status(404).json({ erro: "Livro não encontrado!" })
    res.json(livroAtualizado)
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao atualizar livro" })
  }
})

app.delete('/livros/:id', async (req, res) => {
  try {
    const livro = await LivroModel.findByIdAndDelete(req.params.id)
    if (!livro) return res.status(404).json({ erro: "Livro não encontrado!" })
    res.status(204).send()
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao remover livro" })
  }
})

app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"))
