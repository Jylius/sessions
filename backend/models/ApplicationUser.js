const mongoose = require('mongoose');

const applicationUserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    gender: { type: String, enum: ['erkek', 'kadin'], required: true },
    phone: { type: String, required: true },
    tcno: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    address: { type: String, required: true }
});

module.exports = mongoose.model('ApplicationUser', applicationUserSchema);


//mongoose mongodb için kullanılan bir (object data modeling) kütüphanesidir.
//mongodb deki verilerin javascript objelerine çevirilmesine yarar.


//cons useSchema kısımında yeni bir şema tanımladık. veri tipini tanımladık ardında required true ile doldurulması zorunlu hale getirildi.