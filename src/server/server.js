const express = require("express")
const app = express()
const http = require("http")
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const cors = require("cors")
const methodOverride = require('method-override');
const server = http.createServer(app);
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
const fs = require("fs")
const path = require('path');
const route = require("../server/app/routes/index")
const upload = require('./app/cloudinary/cloudinary')

// server sẽ chạy ở port 5000
server.listen(5000, () => {
    console.log("Listening at port 5000")
})
app.use(bodyParser.urlencoded({ extended: true }));

// kết nối database
async function connectDB() {

    // connect tới database blog
    try {
        await mongoose.connect(`mongodb://127.0.0.1/my_database`, {
            dbName: "smart-watch-app",
            useNewUrlParser: true,
            useUnifiedTopology: true,

        });
        console.log("Connect database Successfully")
    } catch (error) {
        console.log("Connect blog Failure!")
    }

    // connect tới database collection

}
connectDB()

// cấu hình cái này để sử dụng ảnh
app.use(express.static(path.join(__dirname, "public")));
// cấu hình cái này để chuyển dổi dữ liệu khi chuyển lên client
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// cấu hình cái này là fix lỗi cors, chỉ sử dụng trong quá trình phát triển
app.use(cors());
// sử dụng method override để có thể gửi đi với phương thức put patch delete
app.use(methodOverride('_method'));








// sử dụng
route(app)





// // Định nghĩa route xử lý upload ảnh
// app.post('/api/user/upload/avatar', upload.single('avatar'), function (req, res, next) {
//     // req.file chứa thông tin về tệp tin đã tải lên
//     // console.log(req.file);
//     // res.send('File uploaded successfully.');
//     console.log('ok');  
// }); 






const IP = "192.168.1.6"
const { Server } = require("socket.io")
const io = new Server(server, {
    // Cấu hình socket.io sử dụng đường dẫn /socket.io
    path: '/socket.io',
    cors: {
        origin: `http://${IP}:19000`,
        methods: ["GET", "POST"]
    }
})


io.on('connection', (socket) => {

});
