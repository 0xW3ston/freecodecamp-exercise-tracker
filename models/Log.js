const mongoose = require('mongoose');
const { Schema } = mongoose;

const LogSchema = new Schema({
    username: String,
    count: Number,
    log: [{
        description: String,
        duration: Number,
        date: {
            type: Schema.Types.Date,
            default: () => new Date()
        }
    }]
  });

const Log = mongoose.model('Log', LogSchema);

module.exports = {
    Log
}