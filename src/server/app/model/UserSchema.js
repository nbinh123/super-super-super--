const mongoose = require('mongoose');

const Schema = mongoose.Schema
const User = new Schema({
    name: { type: String, default: "" },
    age: { type: Number, default: 18 },
    homies: { type: Array, default: [] },
    username: { type: String, default: "" },
    password: { type: String, default: "" },
    messagingId: { type: String, default: ""},
    passwordHashed: {
        hash: String,
        salt: String,
    },
    phone: { type: String, default: "" },
    room: { type: Array, default: [] },
    specialStatus: { type: Array, default: [] },
    avatar: { type: String, default: "https://cdn-icons-png.flaticon.com/512/1946/1946429.png"},
    favourite: {
        rooms: { type: Array, default: []},
        users: { type: Array, default: []},
        products: { type: Array, default: []},
    },
    cart: { type: Array, default: []},
    promoteCodes: { type: Array, default: []}
})

module.exports = mongoose.model('User', User, "users")