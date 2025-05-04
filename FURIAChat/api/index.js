const express = require('express');
const router = express.Router();

// Rota para obter próximos jogos
router.get('/proximos-jogos', (req, res) => {
  const proximosJogos = [
    { equipes: 'FURIA vs Team1', data: '2025-05-10', horario: '14:00' },
    { equipes: 'FURIA vs Team2', data: '2025-05-12', horario: '16:00' }
  ];
  res.json(proximosJogos);
});

// Rota para obter ranking atual
router.get('/ranking-atual', (req, res) => {
  const ranking = [
    { nome: 'FURIA', pontos: 1200 },
    { nome: 'Team1', pontos: 1100 },
    { nome: 'Team2', pontos: 1000 }
  ];
  res.json(ranking);
});

// Rota para obter alertas ao vivo
router.get('/alertas-ao-vivo', (req, res) => {
  const alertas = [
    { mensagem: 'FURIA está jogando contra Team1 agora!', data: '2025-05-10 14:00' },
    { mensagem: 'FURIA está ganhando de Team2!', data: '2025-05-12 16:00' }
  ];
  res.json(alertas);
});

// Rota para obter notícias da FURIA
router.get('/noticias', (req, res) => {
  const noticias = [
    { titulo: 'FURIA vence mais uma partida importante!', data: '2025-05-05', descricao: 'A FURIA conquistou uma vitória importante contra a Team1 no torneio internacional.' },
    { titulo: 'Jogador KSCERATO brilha no torneio', data: '2025-05-04', descricao: 'KSCERATO foi eleito MVP do torneio regional de CSGO e lidera a equipe FURIA para a vitória.' },
    { titulo: 'FURIA anuncia nova parceria com patrocinador', data: '2025-05-03', descricao: 'A FURIA fechou uma parceria com uma nova marca de tecnologia, fortalecendo ainda mais sua equipe.' }
  ];
  res.json(noticias);
});

module.exports = router;