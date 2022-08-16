const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Chuc_vu_Schema = new Schema({
    ten_chuc_vu: { type: String },
    hoa_hong_chuc_vu: {
        type: Schema.Types.ObjectId,
        ref:'hoa_hong',
    }
});


module.exports = mongoose.model('Chuc_vu', Chuc_vu_Schema);