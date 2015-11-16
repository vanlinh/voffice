var mongoose = require('mongoose');
module.exports = mongoose.model('project', {
    clientId: {type: String, default: ''},
    name: {type: String, default: ''},
    description: { type: String, default: '' },
    type: { type: Number, default: 0 },
    priority: { type: Number, default: 0 },
    order: { type: Number, default: 0 },
    status: { type: Number, default: 0 },//0/1/10: New / Working / Archived
    dueDate: { type: Date  },
    customer: { type: String, ref: 'customer' },
    createUser: { type: String, ref: 'user'},
    users: [
        { type: String, default: '', ref: 'user' }
    ],
    createDate: { type: Date, default: Date.now }
});