const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const apiRoutes = require('./api/index.js');

// Habilita o CORS
app.use(cors());

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Rota inicial que serve o HTML do frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'furiaChat.html'));
});

// Rotas da API
app.use('/api', apiRoutes);

// Configuração da porta
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});