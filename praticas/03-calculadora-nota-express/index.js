//importar o express
const express = require('express')

const app = express()

app.use((req,res,next) =>{
    console.log("Time: ", new Date().toLocaleString())
    console.log("Metodo: ", req.method)
    console.log("Rota: ", req.url)
    next()
})

app.get('/hello',(req,res,next) => {
    res.send('Hello World Atualizado')
})
app.get('/pessoas',(req,res,next) =>{
    const pessoas = [
        {
            id:1,
            pedro:"joão Pedro"
        },
        {
            id: 2,
            nomde: "Ana Paula teste"
        }    
    ]
    res.json(pessoas)
})

app.listen(3000, () => {
    console.log("Minha aplicativo está rodando em http://localhost:3000")
})