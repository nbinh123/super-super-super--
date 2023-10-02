const express = require("express")
const router = express.Router()

const RoomController = require("../../controllers/RoomControllers")


router.put('/add_member', RoomController.add_member)


router.post('/create', RoomController.create)
router.post('/kick_out/member', RoomController.kick_out)
router.post('/following', RoomController.following_seriously)
router.post('/unfollow', RoomController.unfollowing_seriously)
router.post('/delete/room', RoomController.delete_room)


router.get('/find_name', RoomController.find_by_name)
router.get('/find', RoomController.find_room)
router.get('/get', RoomController.index)


router.delete('/delete', RoomController.deleteRoom)

module.exports = router