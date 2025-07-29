# qrcode
Um pequeno código que pode gerar um QR Code apontando para a minha conta do linkedin, usando Node.js + Express. Foi usado a lib qrcode e jimp para permitir adicionar uma imagem dentro do QR Code.

# 📌 Gerador de QR Code com Node.js

Este projeto demonstra como gerar QR Codes usando **Node.js + Express** e a biblioteca **Jimp**.
Tecnologias
> Node.js
> Express
> QRCode
> Jimp

## 🚀 Como instalar e executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/JOPIKAIT/qrcode
2. npm install
3. npm run dev

4. curl -X POST http://localhost:3000/menu/qrcode \
  -H "Content-Type: application/json" \
  -d '{"restaurante":"cantina-da-joana", "mesa":"12"}'

