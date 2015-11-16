var mongoose = require('mongoose');
var bCrypt = require('bcrypt');

var userSchema=mongoose.Schema({
    local: {
        email: {type: String, lowercase: true },
        password: { type: String, required: true},
        hash: { type: String},
        salt: { type: String}

    },
    facebook: {
        id: String,
        token: String,
        email: String
    },
    google: {
        id: String,
        token: String,
        email: String
    },
    name: { type: String, default: '' },
    imageId: { type: String, default: '' },
    status: { type: Number, default: 0 },
    type: { type: Number, default: 0 },
    createDate: { type: Date, default: Date.now }
 });

userSchema.methods.generateHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(9));
};

userSchema.methods.validPassword = function(password){
    return bCrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('user', userSchema);
