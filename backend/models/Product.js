const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Lütfen ürün adı giriniz.'],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Lütfen ürün açıklaması giriniz.']
    },
    price: {
        type: Number,
        required: [true, 'Lütfen ürün fiyatı giriniz.']
    },
    quantityInStock: {
        type: Number,
        required: true,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    // Ürünü oluşturan kullanıcı
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Product', ProductSchema);