const express = require("express")
const router = express.Router()
const upload = require('../../cloudinary/cloudinary')

const UserController = require("../../controllers/UserControllers")


router.put('/edit/info', UserController.edit_info)


router.post('/login', UserController.login)
router.post('/request/room', UserController.request_join_room)
router.post('/cancel/room/', UserController.cancel_request)
router.post('/request/accept', UserController.accept_request)
router.post('/register', UserController.register)
router.post('/request/reject', UserController.reject_request)
router.post('/upload/avatar', upload.single('avatar'), UserController.upload_avatar)


router.get('/get', UserController.re_login)
router.get('/search', UserController.search_by_phone)
router.get('/find_by_id', UserController.search_by_id)


module.exports = router