const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');


// Kayıt olma (Register) endpoint'i
router.post('/register', async (req, res) => {
    try {
        const { username, password, role } = req.body;

        const user = await User.create({ username, password, role });
        const token = user.getSignedJwtToken();

        res.status(201).json({
            success: true,
            token
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

// Giriş yapma (Login) endpoint'i
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Kullanıcı adı veya parola yoksa hata döndür
    if (!username || !password) {
        return res.status(400).json({ success: false, error: 'Lütfen kullanıcı adı ve parola giriniz' });
    }

    try {
        // Kullanıcıyı parolasıyla birlikte bul
        const user = await User.findOne({ username }).select('+password');

        if (!user) {
            return res.status(401).json({ success: false, error: 'Geçersiz kimlik bilgileri' });
        }

        // Parolanın doğru olup olmadığını kontrol et
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Geçersiz kimlik bilgileri' });
        }

        const token = user.getSignedJwtToken();

        res.status(200).json({
            success: true,
            token
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Giriş yapmış kullanıcının bilgilerini getir (korumalı rota)
router.get('/me', protect, (req, res) => {
    res.status(200).json({
        success: true,
        data: req.user
    });
});

// Sadece admin'in erişebileceği örnek bir rota
router.get('/admin-sadece', protect, authorize('admin'), (req, res) => {
    res.status(200).json({
        success: true,
        message: `Merhaba ${req.user.username}, bu sadece adminlere özel bir alan!`
    });
});

module.exports = router;