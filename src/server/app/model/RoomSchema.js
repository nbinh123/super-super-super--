const mongoose = require('mongoose');

const Schema = mongoose.Schema
const Room = new Schema({
    name: { type: String, default: "Phòng chat số 1" },
    createAt: { type: Date, default: new Date() },
    members: { type: Array, default: [] },
    messages: { type: Array, default: [] },
    code: { type: String, default: "admin222" },
    administrators: String,
    request: { type: Array, default: [] },
    followingSeriously: { type: Array, default: [] }
})

module.exports = mongoose.model('Room', Room, "rooms")