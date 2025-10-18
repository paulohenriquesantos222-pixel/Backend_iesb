const express = require ('express')
const app = express()

app.use(express.json())

const mongoose = require ('mongoose')
require('dotenv').config()

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_NAME = process.env.DB_NAME
  

const url ='mongodb+srv://paulohenrique:milza123@servidor.iy89ykg.mongodb.net/?retryWrites=true&w=majority&appName=servidor'

mongoose.connect(url)
 .then (() => {
    console.log("Conectado ao banco MongoDb!!!!")
 })
 .catch(erro => {
    console.log("Erro ao conectar no banco MongoDb: ", erro)
 })

 app.listen(3000, () => {
    console.log("Aplicação rodando em http://localhost:3000")
 })