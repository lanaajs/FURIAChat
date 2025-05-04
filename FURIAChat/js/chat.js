document.addEventListener('DOMContentLoaded', function () {

    function esconderBoasVindas() {
        document.getElementById('boas-vindas').style.display = 'none';
        document.getElementById('informações').style.display = 'none';
        document.getElementById('pesquisa').style.display = 'block';
    }

    function horaAgora() {
        const agora = new Date();
        return agora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function enviarMensagemUsuario(texto) {
        const messagesContainer = document.getElementById('messages');
        const userMessage = document.createElement('div');
        userMessage.classList.add('message-user');
        userMessage.innerHTML = ` 
            <div class="message-content">
                <span class="username">FURIOSO</span> ${texto}
                <div class="message-time">${horaAgora()}</div>
            </div>`;
        messagesContainer.appendChild(userMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function enviarRespostaChat(texto) {
        const messagesContainer = document.getElementById('messages');
        const chatMessage = document.createElement('div');
        chatMessage.classList.add('message-chat');
        chatMessage.innerHTML = ` 
            <div class="message-content">
                <span class="username">FURIAChat</span> ${texto}
                <div class="message-time">${horaAgora()}</div>
            </div>`;
        messagesContainer.appendChild(chatMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function mostrarOpcoes() {
        const buttons = ` 
            <button onclick="selecionarOpção('Notícias da FURIA')">Notícias da FURIA</button>
            <button onclick="selecionarOpção('Próximos Jogos')">Próximos Jogos</button>
            <button onclick="selecionarOpção('Ranking Atual')">Ranking Atual</button>
            <button onclick="selecionarOpção('Alertas Ao Vivo')">Alertas Ao Vivo</button>
            <button onclick="selecionarOpção('Falar com a FURIA no WhatsApp')">Falar com a FURIA no WhatsApp</button>
        `;
        const messagesContainer = document.getElementById('messages');
        const chatMessageOptions = document.createElement('div');
        chatMessageOptions.classList.add('message-chat');
        chatMessageOptions.innerHTML = ` 
            <div class="message-content">
                <span class="username">FURIAChat</span> Oii, selecione as opções abaixo para continuar:
                <div class="options-box">${buttons}</div>
                <div class="message-time">${horaAgora()}</div>
            </div>`;
        messagesContainer.appendChild(chatMessageOptions);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Função para buscar notícias da FURIA
    async function fetchNoticiasFURIA() {
        try {
            const response = await fetch('/api/noticias');
            if (!response.ok) throw new Error('Erro ao buscar notícias.');
            const data = await response.json();
            const noticias = data.map(noticia => `${noticia.titulo} - ${noticia.data}`).join('<br>');
            return `📰 Últimas notícias da FURIA: <br>${noticias}`;
        } catch (error) {
            return `❌ ${error.message}`;
        }
    }

    // Função para buscar próximos jogos
    async function fetchProximosJogos() {
        try {
            const response = await fetch('/api/proximos-jogos');
            if (!response.ok) throw new Error('Erro ao buscar próximos jogos.');
            const data = await response.json();
            const jogos = data.map(jogo => `${jogo.equipes} - ${jogo.data} às ${jogo.horario}`).join('<br>');
            return `⚽ Próximos jogos da FURIA: <br>${jogos}`;
        } catch (error) {
            return `❌ ${error.message}`;
        }
    }

    // Função para buscar o ranking atual
    async function fetchRankingAtual() {
        try {
            const response = await fetch('/api/ranking-atual');
            if (!response.ok) throw new Error('Erro ao buscar ranking atual.');
            const data = await response.json();
            const ranking = data.map(equipe => `${equipe.nome} - ${equipe.pontos} pontos`).join('<br>');
            return `🏆 Ranking Atual da FURIA: <br>${ranking}`;
        } catch (error) {
            return `❌ ${error.message}`;
        }
    }

    // Função para buscar alertas ao vivo
    async function fetchAlertasAoVivo() {
        try {
            const response = await fetch('/api/alertas-ao-vivo');
            if (!response.ok) throw new Error('Erro ao buscar alertas ao vivo.');
            const data = await response.json();
            const alertas = data.map(alerta => `${alerta.mensagem} - ${alerta.data}`).join('<br>');
            return `🚨 Alertas ao vivo: <br>${alertas}`;
        } catch (error) {
            return `❌ ${error.message}`;
        }
    }

    document.getElementById('botao-enviar').addEventListener('click', function () {
        const input = document.getElementById('barra-pesquisa');
        const messageText = input.value.trim();
        if (!messageText) return;

        esconderBoasVindas();

        // Fixar a barra de pesquisa no rodapé
        const pesquisa = document.getElementById('pesquisa');
        const sidebar = document.getElementById('sidebar');
        pesquisa.style.position = 'fixed';
        pesquisa.style.left = '50%';
        pesquisa.style.transform = 'translateX(-50%)';
        pesquisa.style.bottom = '40px';

        // calcula a largura real da sidebar
        const sidebarWidth = sidebar.classList.contains('closed') ? 60 : 250;

        // ajusta o left da barra de pesquisa com base na sidebar
        pesquisa.style.left = `calc(60% + ${sidebarWidth / 2 - 125}px)`; 

        enviarMensagemUsuario(messageText);
        input.value = '';
        document.getElementById('chat-container').style.display = 'block';

        // Verifica palavras-chave
        if (messageText.toLowerCase().includes('notícias') || messageText.toLowerCase().includes('noticias') || messageText.toLowerCase().includes('noticia')) {
            fetchNoticiasFURIA().then(resposta => {
                enviarRespostaChat(resposta);
                mostrarOpcoes(); // Exibe a caixa de seleção após a resposta
            });
        } else if (messageText.toLowerCase().includes('próximos jogos') || messageText.toLowerCase().includes('jogo') || messageText.toLowerCase().includes('jogos')) {
            fetchProximosJogos().then(resposta => {
                enviarRespostaChat(resposta);
                mostrarOpcoes(); // Exibe a caixa de seleção após a resposta
            });
        } else if (messageText.toLowerCase().includes('ranking') || messageText.toLowerCase().includes('classificação')) {
            fetchRankingAtual().then(resposta => {
                enviarRespostaChat(resposta);
                mostrarOpcoes(); // Exibe a caixa de seleção após a resposta
            });
        } else if (messageText.toLowerCase().includes('alertas ao vivo') || messageText.toLowerCase().includes('alertas')) {
            fetchAlertasAoVivo().then(resposta => {
                enviarRespostaChat(resposta);
                mostrarOpcoes(); // Exibe a caixa de seleção após a resposta
            });
        } else if (messageText.toLowerCase().includes('contato') || messageText.toLowerCase().includes('WhatsApp') || messageText.toLowerCase().includes('whatsApp') ) {
            enviarRespostaChat('💬 Clique no link para falar com a FURIA no WhatsApp: <a href="https://wa.me/5511993404466" target="_blank">Contato FURIA🐾</a>');
            mostrarOpcoes(); // Exibe a caixa de seleção após a resposta
        } else {
            setTimeout(() => {
                enviarRespostaChat(`
                    Oii, Selecione as opções abaixo para iniciar a conversa:
                    <div class="options-box">
                        <button onclick="selecionarOpção('Notícias da FURIA')">Notícias da FURIA</button>
                        <button onclick="selecionarOpção('Próximos Jogos')">Próximos Jogos</button>
                        <button onclick="selecionarOpção('Ranking Atual')">Ranking Atual</button>
                        <button onclick="selecionarOpção('Alertas Ao Vivo')">Alertas Ao Vivo</button>
                        <button onclick="selecionarOpção('Falar com a FURIA no WhatsApp')">Falar com a FURIA no WhatsApp</button>
                    </div>
                `);
                mostrarOpcoes(); // Exibe a caixa de seleção após a resposta padrão
            }, 800);
        }
    });

    // Função para quando o usuário clicar nos botões
    window.selecionarOpção = function (opcao) {
        enviarMensagemUsuario(opcao);

        setTimeout(() => {
            let respostaChat = '';
            let exibirBotoes = true;

            switch (opcao) {
                case 'Notícias da FURIA':
                    fetchNoticiasFURIA().then(resposta => enviarRespostaChat(resposta));
                    break;
                case 'Próximos Jogos':
                    fetchProximosJogos().then(resposta => enviarRespostaChat(resposta));
                    break;
                case 'Ranking Atual':
                    fetchRankingAtual().then(resposta => enviarRespostaChat(resposta));
                    break;
                case 'Alertas Ao Vivo':
                    fetchAlertasAoVivo().then(resposta => enviarRespostaChat(resposta));
                    break;
                case 'Falar com a FURIA no WhatsApp':
                    respostaChat = '💬 Clique no link para falar com a FURIA no WhatsApp: <a href="https://wa.me/5511993404466" target="_blank">Contato FURIA🐾</a>';
                    break;
                default:
                    respostaChat = '⚠️ Opção não reconhecida.';
            }

            enviarRespostaChat(respostaChat);

            if (exibirBotoes) {
                setTimeout(() => {
                    mostrarOpcoes();
                }, 800);
            }
        }, 800);
    };

});
