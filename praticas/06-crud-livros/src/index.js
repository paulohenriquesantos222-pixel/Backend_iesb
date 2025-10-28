const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const LivroController = require('./controllers/LivroController')

dotenv.config()

const app = express()
app.use(express.json())

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_NAME = process.env.DB_NAME

const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(url)
  .then(() => {
    console.log("Conectado ao banco MongoDB Atlas!")
  })
  .catch(erro => {
    console.log("Erro ao conectar no MongoDB Atlas: ", erro)
  })

app.use('/livros', LivroController)

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000")
})
