const wppconnect = require('@wppconnect-team/wppconnect');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

let client = null;

// Função para inicializar o WhatsApp
async function initializeWhatsApp() {
    try {
        console.log('🚀 Iniciando WPP Connect...');
        
        client = await wppconnect.create({
            session: 'whatsapp-session',
            catchQR: (base64Qr, asciiQR) => {
                console.log('📱 QR Code gerado! Escaneie com seu WhatsApp:');
                console.log(asciiQR);
                
                // Salva o QR code em base64 para exibir na web
                qrCode = base64Qr;
            },
            statusFind: (statusSession, session) => {
                console.log('📊 Status da sessão:', statusSession);
                console.log('🔗 Sessão:', session);
            },
            headless: true,
            devtools: false,
            useChrome: true,
            debug: false,
            logQR: true,
            browserArgs: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--disable-gpu'
            ]
        });

        console.log('✅ WhatsApp conectado com sucesso!');
        
        // Event listeners
        client.onMessage(async (message) => {
            console.log('📨 Nova mensagem recebida:', message.body);
            
            // Resposta automática simples
            if (message.body.toLowerCase() === 'oi' || message.body.toLowerCase() === 'olá') {
                await client.sendText(message.from, '👋 Olá! Este é um bot automatizado usando WPP Connect!');
            }
            
            if (message.body.toLowerCase() === 'help' || message.body.toLowerCase() === 'ajuda') {
                const helpMessage = `
🤖 *Bot WhatsApp - Comandos Disponíveis:*

• *oi/olá* - Saudação
• *help/ajuda* - Lista de comandos
• *status* - Status do bot
• *ping* - Teste de conectividade

Desenvolvido com WPP Connect 🚀
                `;
                await client.sendText(message.from, helpMessage);
            }
            
            if (message.body.toLowerCase() === 'status') {
                await client.sendText(message.from, '✅ Bot online e funcionando!');
            }
            
            if (message.body.toLowerCase() === 'ping') {
                await client.sendText(message.from, '🏓 Pong!');
            }
        });

        client.onStateChange((state) => {
            console.log('🔄 Estado da conexão:', state);
        });

        client.onDisconnected((reason) => {
            console.log('❌ Desconectado:', reason);
        });

    } catch (error) {
        console.error('❌ Erro ao inicializar WhatsApp:', error);
    }
}

let qrCode = null;

// Rotas da API
app.get('/', (req, res) => {
    res.json({
        message: 'WhatsApp Bot API - WPP Connect',
        status: client ? 'connected' : 'disconnected',
        endpoints: {
            '/qr': 'GET - Obter QR Code',
            '/send': 'POST - Enviar mensagem',
            '/status': 'GET - Status da conexão'
        }
    });
});

app.get('/qr', (req, res) => {
    if (qrCode) {
        res.json({
            qrCode: qrCode,
            message: 'Escaneie o QR Code com seu WhatsApp'
        });
    } else {
        res.json({
            message: 'QR Code não disponível. WhatsApp pode já estar conectado.'
        });
    }
});

app.get('/status', (req, res) => {
    res.json({
        connected: client ? true : false,
        timestamp: new Date().toISOString()
    });
});

app.post('/send', async (req, res) => {
    try {
        const { number, message } = req.body;
        
        if (!client) {
            return res.status(400).json({
                error: 'WhatsApp não está conectado'
            });
        }
        
        if (!number || !message) {
            return res.status(400).json({
                error: 'Número e mensagem são obrigatórios'
            });
        }
        
        // Formatar número (adicionar @c.us se necessário)
        const formattedNumber = number.includes('@c.us') ? number : `${number}@c.us`;
        
        await client.sendText(formattedNumber, message);
        
        res.json({
            success: true,
            message: 'Mensagem enviada com sucesso!',
            to: formattedNumber
        });
        
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        res.status(500).json({
            error: 'Erro ao enviar mensagem',
            details: error.message
        });
    }
});

// Inicializar servidor
app.listen(PORT, () => {
    console.log(`🌐 Servidor rodando na porta ${PORT}`);
    console.log(`📱 Acesse http://localhost:${PORT} para ver a API`);
    
    // Inicializar WhatsApp
    initializeWhatsApp();
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('🛑 Encerrando aplicação...');
    if (client) {
        await client.close();
    }
    process.exit(0);
});
