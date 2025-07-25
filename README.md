# WhatsApp Bot - WPP Connect

Um bot simples para WhatsApp usando a biblioteca WPP Connect, que permite automatizar mensagens e criar uma API REST para integração.

## 🚀 Funcionalidades

- ✅ Conexão automática com WhatsApp Web
- 📱 Geração de QR Code para autenticação
- 🤖 Respostas automáticas para comandos básicos
- 🌐 API REST para envio de mensagens
- 📊 Monitoramento de status da conexão
- 🔄 Reconexão automática

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Google Chrome instalado

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd whatsapp-wpp-connect
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente (opcional):
```bash
cp .env.example .env
```

4. Execute o projeto:
```bash
npm start
```

## 📱 Como usar

1. **Primeira execução:**
   - Execute `npm start`
   - Um QR Code será exibido no terminal
   - Escaneie o QR Code com seu WhatsApp
   - Aguarde a confirmação de conexão

2. **Comandos do Bot:**
   - `oi` ou `olá` - Saudação
   - `help` ou `ajuda` - Lista de comandos
   - `status` - Status do bot
   - `ping` - Teste de conectividade

## 🌐 API Endpoints

### GET /
Informações gerais da API

### GET /qr
Retorna o QR Code em base64 para autenticação

### GET /status
Verifica o status da conexão

### POST /send
Envia uma mensagem

**Body:**
```json
{
  "number": "5511999999999",
  "message": "Sua mensagem aqui"
}
```

## 📝 Exemplo de uso da API

```bash
# Verificar status
curl http://localhost:3000/status

# Enviar mensagem
curl -X POST http://localhost:3000/send \
  -H "Content-Type: application/json" \
  -d '{
    "number": "5511999999999",
    "message": "Olá! Esta é uma mensagem automática."
  }'
```

## 🔧 Scripts disponíveis

```bash
# Iniciar o servidor
npm start

# Iniciar em modo de desenvolvimento (com nodemon)
npm run dev
```

## 📁 Estrutura do projeto

```
whatsapp-wpp-connect/
├── index.js          # Arquivo principal
├── package.json       # Dependências e scripts
├── .env.example       # Exemplo de configuração
├── README.md          # Documentação
└── tokens/            # Sessões do WhatsApp (criado automaticamente)
```

## ⚠️ Observações importantes

- O WhatsApp Web só permite uma sessão ativa por vez
- Mantenha o servidor rodando para manter a conexão
- Os dados da sessão são salvos localmente para evitar re-autenticação
- Use com responsabilidade e respeite os termos de uso do WhatsApp

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🔗 Links úteis

- [WPP Connect Documentation](https://wppconnect.io/)
- [WhatsApp Business API](https://developers.facebook.com/docs/whatsapp)

---

Desenvolvido com ❤️ usando WPP Connect
