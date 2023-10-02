const express = require("express") // dùng thư viện express
const app = express()
const RoomSchema = require('../model/RoomSchema')
const UserSchema = require('../model/UserSchema')

class RoomControllers {
    index = async (req, res, next) => {
        const data = await RoomSchema.find({})

        res.json(data)
    }
    create = async (req, res, next) => {

        const { name, members, administrators } = req.body
        const newRoom = new RoomSchema(req.body)
        // lưu phòng vào database
        const room = await newRoom.save()
        await members.forEach(async (element) => {
            const schema = await UserSchema.findOne({ phone: element })
            schema.room.push(room._id)
            await schema.save()
                .then(data => {
                    if (element === administrators) {
                        res.json({
                            status: 200,
                            data: data
                        })
                    }
                })
        })
 

    }
    add_member = async (req, res, next) => {
        const { id, members } = req.body
        async function createNewListMembers() {
            const data = await RoomSchema.findById(id, 'members')
            return [...data.members, ...members]
        }
        RoomSchema.findOneAndUpdate(
            { _id: id },
            {
                $push: {
                    members: await createNewListMembers()
                }
            }, {
            new: true
        }
        )
            .then(data => res.json(data))
    }
    find_room = async (req, res, next) => {

        const data = await RoomSchema.findById(req.query.id)
        res.json(data)

    }
    // chỗ này cần tối ưu hóa 
    find_by_name = async (req, res, next) => {
        const { name } = req.query
        const data = await RoomSchema.find({})
        const filtered = data.filter(e => e.name.includes(name))
        res.json(filtered)
    }
    kick_out = async (req, res, next) => {
        const { roomId, phone } = req.body
        
        // xóa id của phòng trong key room của người dùng
        await UserSchema.findOneAndUpdate(
            { phone: phone },
            {
                $pull: {
                    room: roomId
                }
            },{
                new: true
            }
        )

        // xóa trường member và trường follow trong room
        const data = await RoomSchema.findByIdAndUpdate(
            roomId,
            {
                $pull: {
                    members: phone,
                    followingSeriously: phone
                }
            },{
                new: true
            }
        )
        res.json(data)
        
    }
    deleteRoom = async (req, res, next) => {
        const { roomId } = req.body
        // res.json(roomId)
        const deleted = await RoomSchema.findByIdAndDelete(roomId)
        res.json(deleted)
    }
    following_seriously = async (req, res, next) => {
        const { phone, roomId } = req.body
        const data = await RoomSchema.findById(roomId)

        if(data.members.includes(phone) && !data.followingSeriously.includes(phone)){

            const response = await RoomSchema.findOneAndUpdate(
                { _id: roomId },
                {
                    $push: {
                        followingSeriously: phone
                    }
                },{
                    new: true
                }
            )
            res.json(response)

        }else{
            res.json({
                status: 400,
                message: "Người này không nằm trong danh sách thành viên nhóm hoặc đã tồn tại trong danh sách theo dõi"
            })
        }
    }
    unfollowing_seriously = async (req, res, next) => {
        const { roomId, phone } = req.body
        const data = await RoomSchema.findById(roomId)
        
        if(data.followingSeriously.includes(phone)){
            const response = await RoomSchema.findByIdAndUpdate(
                roomId,
                {
                    $pull: {
                        followingSeriously: phone
                    }
                },{
                    new: true
                }
            )
            res.json(response)
        }else{
            res.json({
                status: 400,
                message: "Người dùng không tồn tại trong danh sách theo dõi"
            })
        }
    }
    delete_room = async (req, res, next) => {
        const { roomId } = req.body
        const response = await RoomSchema.deleteOne({
            _id: roomId
        })
        res.json(response)
    }
}

module.exports = new RoomControllers;