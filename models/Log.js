const mongoose = require('mongoose');
const { Schema } = mongoose;

const LogSchema = new Schema({
    username: String,
    count: Number,
    log: [{
        description: String,
        duration: Number,
        date: {
            type: String,
            default: () => new Date().toDateString()
        }
    }]
  });

const Log = mongoose.model('Log', LogSchema);

module.exports = {
    Log
}