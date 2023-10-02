const express = require("express") // dùng thư viện express
const app = express()
const UserSchema = require("../model/UserSchema")
const RoomSchema = require("../model/RoomSchema")
const IP = 'localhost'
//`192.168.1.53`
// thuật toán hash mật khẩu
const crypto = require('crypto');

async function hashPassword(password) {
    // Tạo một salt ngẫu nhiên
    const salt = crypto.randomBytes(16).toString('hex');

    // Sử dụng sha256 để hash password kết hợp với salt
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex');

    // Trả về salt cùng với hash password để lưu vào cơ sở dữ liệu
    return { salt, hash };
}

function verifyPassword(password, salt, hash) {
    // Sử dụng lại salt và hash đã lưu trong cơ sở dữ liệu để kiểm tra password nhập vào
    const verifyHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex');

    // So sánh hash của password nhập vào với hash đã lưu
    return hash === verifyHash;
}

class UserController {
    index = async (req, res, next) => {
        const data = await UserSchema.find({})
        let list = []
        // data.forEach(e => {
        //     list.push(e.phone)
        // })
        res.json(data)
    }
    register = async (req, res, next) => {
        const { username, phone, password } = req.body
        const hash = await hashPassword(password)
        // bước đăng ký
        const newUser = new UserSchema({
            username: username,
            phone: phone,
            password: password,
            passwordHashed: {
                hash: hash.hash,
                salt: hash.salt
            }
        })
        newUser.save()
            .then(() => {
                res.redirect("http://localhost:3000")
            })
    }
    login = async (req, res, next) => {
        const { username, password } = req.body

        // lấy ra thông tin người dùng theo username
        const data = await UserSchema.findOne(
            { username: username }
        )
        if (verifyPassword(password, data.passwordHashed.salt, data.passwordHashed.hash)) {
            res.status(200).json({
                message: "Login successfully",
                UID: data._id,
                userData: data,
                status: 200
            })
        } else {
            res.json({
                message: "Login fail",
                status: 400
            })
        }
    }
    re_login = async (req, res, next) => {

        const { id } = req.query

        const data = await UserSchema.findById(id)
        res.json(data)
    }
    search_by_phone = async (req, res, next) => {
        const { phone } = req.query
        if (phone !== "") {
            const data = await UserSchema.find({ phone: { $regex: phone, $options: 'i' } })
            const filteredData = data.map(item => ({
                name: item.name,
                phone: item.phone,
                avatar: item?.avatar,
                _id: item._id
            }))

            res.json(filteredData)
        }
    }
    request_join_room = async (req, res, next) => {
        const { roomId, myId, phone } = req.body
        const checked = await RoomSchema.findById(roomId)
        if (!checked.members.includes(phone) && !checked.request.includes(myId)) {
            const updated = await RoomSchema.findByIdAndUpdate(roomId,
                {
                    $push: {
                        request: myId
                    }
                }, {
                new: true
            })
            res.json({
                status: 200,
                data: updated
            })
        } else {
            res.json({
                status: 400,
                message: "Người dùng đã gửi yêu cầu tham gia nhóm"
            })
        }
    }
    // cái này yêu cầu check ở front-end, xem người gọi có phải admin không
    accept_request = async (req, res, next) => {
        const { roomId, thisId, phone } = req.body
        const checked = await RoomSchema.findById(roomId)
        // xóa request trong room, sau đó là thêm vào mảng members
        // thêm id phòng vào room người dùng
        await UserSchema.findByIdAndUpdate(thisId,
            {
                $push: {
                    room: roomId
                }
            }, {
            new: true
        }
        )
        if (!checked.members.includes(phone) && phone.length === 10) {
            const response = await RoomSchema.findByIdAndUpdate(roomId,
                {
                    $pull: {
                        request: thisId
                    },
                    $push: {
                        members: phone
                    }
                }, {
                new: true
            })
            res.json(response)
        } else {
            res.json({
                message: "Người dùng đã là thành viên của nhóm này, có lỗi"
            })
        }


    }
    reject_request = async (req, res, next) => {
        const { roomId, thisId } = req.body
        const data = await RoomSchema.findByIdAndUpdate(roomId,
            {
                $pull: {
                    request: thisId
                }
            }, {
            new: true
        }
        )
        res.json(data)
    }
    cancel_request = async (req, res, next) => {
        const { roomId, myId } = req.body
        const response = await RoomSchema.findByIdAndUpdate(roomId,
            {
                $pull: {
                    request: myId
                }
            }, {
            new: true
        })
        res.json({
            status: 200,
            data: response
        })
    }
    search_by_id = async (req, res, next) => {
        const { id } = req.query
        const data = await UserSchema.findById(id)
        res.json(data)
    }
    edit_info = async (req, res, next) => {
        const { id, nameKey, value } = req.body
        if (await nameKey === "age") {
            nameKey = Number(nameKey)
        }
        const response = await UserSchema.findByIdAndUpdate(
            id,
            {
                $set: {
                    [nameKey]: value
                }
            }, {
            new: true
        }
        )
        res.json(response)
    }
    upload_avatar = async (req, res, next) => {
        const { id } = await req.body
        const path = await req.file.path
        UserSchema.findByIdAndUpdate(
            id,
            {
                $set: {
                    avatar: await path
                }
            },{
                new: true
            }
        ).then(() => res.redirect('back'))
    }
} 

module.exports = new UserController;