# Como subir o projeto para o GitHub

## Passo a passo para criar o repositório no GitHub:

### 1. Criar repositório no GitHub
1. Acesse [GitHub.com](https://github.com)
2. Clique em "New repository" (botão verde)
3. Nome do repositório: `whatsapp-wpp-connect`
4. Descrição: `Bot WhatsApp usando WPP Connect com API REST`
5. Deixe como **público** ou **privado** (sua escolha)
6. **NÃO** marque "Initialize this repository with a README"
7. Clique em "Create repository"

### 2. Conectar seu repositório local ao GitHub
Após criar o repositório, execute os comandos abaixo no terminal:

```bash
# Navegar para o diretório do projeto
cd whatsapp-wpp-connect

# Adicionar o repositório remoto (substitua SEU_USUARIO pelo seu username do GitHub)
git remote add origin https://github.com/SEU_USUARIO/whatsapp-wpp-connect.git

# Renomear a branch para main (opcional, mas recomendado)
git branch -M main

# Fazer push do código para o GitHub
git push -u origin main
```

### 3. Exemplo completo
Se seu username do GitHub for `joaosilva`, os comandos seriam:

```bash
cd whatsapp-wpp-connect
git remote add origin https://github.com/joaosilva/whatsapp-wpp-connect.git
git branch -M main
git push -u origin main
```

### 4. Verificar se funcionou
- Acesse seu repositório no GitHub
- Você deve ver todos os arquivos do projeto
- O README.md será exibido automaticamente na página principal

## ✅ Pronto!
Seu projeto WhatsApp Bot com WPP Connect agora está no GitHub e pode ser clonado e usado por outras pessoas.

### Para testar localmente:
```bash
npm start
```

O servidor iniciará na porta 3000 e você verá o QR Code no terminal para conectar seu WhatsApp.
