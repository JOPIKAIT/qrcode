const express = require('express')
const QRCode = require('qrcode')
const Jimp = require('jimp')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = 3000

const qrcodeDir = path.join(__dirname, 'qrcodes')
if (!fs.existsSync(qrcodeDir)) {
  fs.mkdirSync(qrcodeDir)
}

app.use(express.json())
app.use('/qrcodes', express.static(qrcodeDir))

app.post('/menu/qrcode', async (req, res) => {
  const { restaurante, mesa } = req.body

  if (!restaurante || !mesa) {
    return res.status(400).json({ error: 'Parâmetros "restaurante" e "mesa" são obrigatórios.' })
  }

  const menuURL = `https://www.linkedin.com/in/jo%C3%A3o-pinto-kabonda-41ba28161/menu?restaurante=${encodeURIComponent(restaurante)}&mesa=${encodeURIComponent(mesa)}`
  const filename = `menu-${restaurante}-${mesa}-${Date.now()}.png`
  const filepath = path.join(qrcodeDir, filename)

  try {
    const qrBuffer = await QRCode.toBuffer(menuURL, {
      width: 500,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    })

    const qrImage = await Jimp.read(qrBuffer)

    const logoPath = path.join(__dirname, 'pngtree.png')
    if (!fs.existsSync(logoPath)) {
      return res.status(500).json({ error: 'Arquivo de logotipo não encontrado.' })
    }

    const logo = await Jimp.read(logoPath)

    const qrSize = qrImage.bitmap.width
    const logoSize = qrSize * 0.2
    logo.resize(logoSize, logoSize)

    const x = (qrSize - logoSize) / 2
    const y = (qrSize - logoSize) / 2

    qrImage.composite(logo, x, y)

    await qrImage.writeAsync(filepath)

    const fullUrl = `${req.protocol}://${req.get('host')}/qrcodes/${filename}`

    res.json({
      message: 'QR Code com logotipo gerado com sucesso!',
      menu_url: menuURL,
      qrcode_url: fullUrl
    })
  } catch (err) {
    console.error('Erro ao gerar QR Code:', err)
    res.status(500).json({
      error: 'Erro ao gerar QR Code com logotipo.',
      detalhes: err.message
    })
  }
})

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`)
})

