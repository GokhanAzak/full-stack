// Gerekli paketleri içe aktarıyoruz
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const auth = require('./routes/auth');
const orders = require('./routes/orders');
const products = require('./routes/products');

// Ortam değişkenlerini yükle
dotenv.config();


app.use('/api/v1/auth', auth);
app.use('/api/v1/orders', orders);
app.use('/api/v1/products', products);


app.use(express.json());

// Rota dosyalarını kullan
app.use('/api/v1/auth', auth);

const app = express();
const PORT = process.env.PORT || 5000;

// Veri tabanına bağlan
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB veritabanına başarıyla bağlanıldı.');
}).catch((error) => {
    console.error('MongoDB bağlantı hatası:', error);
});

// Middleware'leri tanımlıyoruz
app.use(express.json());

// Temel bir API endpoint'i oluşturuyoruz
app.get('/', (req, res) => {
    res.send('Full-stack projesi backendine hoş geldin!');
});

// Sunucuyu başlatıyoruz
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});