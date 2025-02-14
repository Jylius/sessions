const mongoose = require('mongoose');

const ilIlceSchema = new mongoose.Schema({
    il: { type: String, required: true },
    ilceler: [{ type: String }]
});
module.exports = mongoose.model('IlIlce', ilIlceSchema, 'il_ilce');
