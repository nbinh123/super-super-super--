// const UserRoute = require("../routes/user/UserRoute")
// const GameRoutes = require("./game/GameRoutes")
// const ShopRoutes = require("./shop/ShopRoutes")
// nạp các route vào đây để sử dụng

const UserRoute = require("../routes/user/UserRoutes")
const RoomRoute = require("../routes/room/RoomRoutes")
const ProductRoute = require("../routes/product/ProductRouter")

function route(app) {
    app.use("/api/user", UserRoute)
    app.use("/api/room", RoomRoute)
    app.use("/api/product", ProductRoute)
}

module.exports = route