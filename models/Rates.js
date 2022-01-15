const mongoose = require('mongoose');


const RatesSchema = mongoose.Schema({
    goldrt: String,
    silverrt: String,
    date: String
})


module.exports = mongoose.model('ratesdb', RatesSchema);