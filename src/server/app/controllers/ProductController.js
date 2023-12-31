const express = require("express") // dùng thư viện express
const ProductSchema = require("../model/ProductSchema")
const UserSchema = require("../model/UserSchema")


const products = [
    {
        "_id": "64b11fb4de382565d01dc09c",
        "name": "Xoài",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 100,
        "update": true,
        "type": [
            "fruit"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc09e",
        "name": "Mận",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 50,
        "update": true,
        "type": [
            "fruit"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc09f",
        "name": "Kiwi",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 30,
        "update": true,
        "type": [
            "fruit"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc0a0",
        "name": "Hạt sen",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 29,
        "update": true,
        "type": [
            "fruit"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc08b",
        "name": "Kem ốc quế",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "dessert"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc08c",
        "name": "Nho tươi",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "fruit"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc08d",
        "name": "Xoài lắc",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "fast-food"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc090",
        "name": "Bánh trứng nướng",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "fast-food"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc091",
        "name": "Bánh tráng cuốn sốt me",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "fast-food"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc092",
        "name": "Chè khoai dẻo",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "dessert"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc093",
        "name": "Bánh cay muối ớt",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "fast-food"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc094",
        "name": "Nem chua rán",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "fast-food"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc095",
        "name": "Cá viên chiên",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "fast-food"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc096",
        "name": "Bắp xào bơ tỏi",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "fast-food"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc08e",
        "name": "Bánh mì sốt chua cay",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "fast-food"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc08f",
        "name": "Bánh tráng trộn siêu cay",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "fast-food"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc099",
        "name": "Chè sương sa hạt lựu",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "dessert"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc09a",
        "name": "Cam",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "fruit"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc09b",
        "name": "Dâu tây",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "fruit"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc09d",
        "name": "Chanh dây",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "fruit"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc0a1",
        "name": "Ớt chuông",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "fruit"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc0a2",
        "name": "Táo đỏ",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "fruit"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc0a3",
        "name": "Nước ép táo",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "juice",
            "water",
            "dessert"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc0a4",
        "name": "Nước ép nho",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "juice",
            "water",
            "dessert"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc097",
        "name": "Chè chuối chưng",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "dessert"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc098",
        "name": "Chè bắp",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "dessert"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc0a7",
        "name": "Nước ép dâu",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "juice",
            "water",
            "dessert"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc0a8",
        "name": "Sinh tố xoài",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "smoothie",
            "dessert"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc0a9",
        "name": "Sinh tố bơ",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "smoothie",
            "dessert"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc0aa",
        "name": "Nước ổi không hạt",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "juice",
            "water",
            "dessert"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc0ab",
        "name": "Nước ép thanh long",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "juice",
            "water",
            "dessert"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc0ac",
        "name": "Nước ép dứa",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "juice",
            "water",
            "dessert"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc0ad",
        "name": "Nước ép cà chua",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "juice",
            "water",
            "dessert"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc0ae",
        "name": "Nước ép dưa hấu",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "juice",
            "water",
            "dessert"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc0af",
        "name": "Nước ép cà rốt",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "juice",
            "water",
            "dessert"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc0b0",
        "name": "Xoa xoa",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "smoothie",
            "dessert"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc0b1",
        "name": "Chè hạt sen",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "water",
            "dessert"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc0b2",
        "name": "Trà sữa chân trâu đường đen",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "tea",
            "water",
            "dessert"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc0b3",
        "name": "Trà sữa dâu tây",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "tea",
            "water",
            "dessert"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc0b4",
        "name": "Trà sữa hồng trà",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "tea",
            "water",
            "dessert"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc0b5",
        "name": "Trà sữa sô cô la",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "tea",
            "water",
            "dessert"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc0b6",
        "name": "Trà sữa matcha",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "tea",
            "water",
            "dessert"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc0a5",
        "name": "Nước Kiwi",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "juice",
            "water",
            "dessert"
        ],
        "__v": 0
    },
    {
        "_id": "64b11fb4de382565d01dc0a6",
        "name": "Nước mía nguyên chất",
        "price": 13000,
        "quanlity": 0,
        img: "",
        "sold": 0,
        "update": true,
        "type": [
            "juice",
            "water",
            "dessert"
        ],
        "__v": 0
    }
]
// hàm phân trang
function pagination(arr, page) {
    const data = []
    // 0 -> 4
    // 5 -> 9
    // 10 -> 14
    // 15 -> 19
    for (let i = ((page - 1) * 5); i < page * 5; i++) {
        // tìm ra các phần tử dựa theo số trang ở mục lục trên và push nó vào mảng
        if (arr[i]) {
            data.push(arr[i])
        }
    }
    return data
}

class ProductController {

    //  [GET]       /search
    search = (req, res, next) => {

        // chuyển đổi chuỗi thành một mảng nếu như chỉ truyền lên 1 type: type => [type]
        // còn nếu có từ 2 phần tử trở lên thì nó là mảng:                   type => type
        function convert(type) {
            if (typeof type === "string") {
                return [type]
            } else {
                return type
            }
        }

        const request = {
            type: convert(req.query.type),// là trường type của product      return => [n]
            page: Number(req.query.page) // là số phần tử trả về:                    return => number = (page*5-1) -> ((page-1)*5)
        }

        // thay:                return data => res.json(data) / res.send(data)
        function handleSearch(products, type, page) {

            // hàm phân trang
            // phân chia trang ra, mỗi trang 5 phần tử
            // tìm sản phẩm nào đó có type trùng với tham số type truyền vào
            // chỉ cần có một cái trùng thì sẽ lấy luôn phần tử đó
            function checkArrayIntersection(arr1, arr2) {
                for (let i = 0; i < arr1.length; i++) {
                    if (arr2.includes(arr1[i])) {
                        return true;
                    }
                }
                return false;
            }

            // lọc sản phẩm theo key là type
            const filtedProducts = products.filter(product => checkArrayIntersection(product.type, type))
            // phân trang dựa theo page
            let data
            // nếu như có truyền query là page thì sẽ phân trang, còn không thì sẽ lấy tất cả
            if (page) {
                data = pagination(filtedProducts, page)
            } else {
                data = filtedProducts
            }
            res.json({
                data: data,
                status: 200
            })
        }

        // đã chỉnh sửa ở đây
        ProductSchema.find({}, '_id name price quanlity image type')
            .then(products => {
                //              []         []           Number
                handleSearch(products, request.type, request.page)
            })
            .catch(next)
    }
    //  [GET]       /find
    search_with_keyword = async (req, res, next) => {
        const { keyword } = req.query
        const products = await ProductSchema.find({})
        async function filterWithKeyword() {
            const filteredProducts = products.filter(product => product.name.includes(keyword))
            res.json(filteredProducts)
        }
        await filterWithKeyword()
    }
    // [GET]        /read
    read = (req, res, next) => {
        const id = req.query.id
        ProductSchema.findById(id)
            .then(product => res.json(product))
    }
    //  [GET]       /get
    get = (req, res, next) => {

        // trả về tất cả trường trong database
        function returnAll(data) {
            res.json(data)
        }

        ProductSchema.find({})
            .then(product => {
                returnAll(product)
            })
            .catch(() => {
                res.json({
                    data: null,
                    status: 400
                })
                next()
            })
    }
    //  [POST]      /arrange
    arrange = async (req, res, next) => {
        // router thực hiện <--CHỨC NĂNG SẮP XẾP--> dựa trên <--ĐỘ BÁN CHẠY--> của sản phẩm, chỉ có admin mới có thể dùng
        const products = await ProductSchema.find({})
        async function arrangeProducts() {
            const sortedProducts = products.sort((a, b) => b.sold - a.sold);

            // In mảng sản phẩm mới đã được sắp xếp
            res.json(sortedProducts);
        }
        await arrangeProducts()

    }
    //  [PUT]       /update/quantity
    update_quanlity = async (req, res, next) => {
        const { userId, productId, quantity } = await req.body
        const userData = await UserSchema.findById(userId)

        async function updateQuantityById(){
            // tìm vị trí của món hàng cần thay đổi quantity trong mảng
            let index = userData.cart.findIndex((item) => item._id === productId)
            // thay quantity hiện tại bằng quantity mới
            userData.cart[index].quantity = Number(quantity)
            // lưu lại
            const response = await UserSchema.findByIdAndUpdate(
                userId,
                {
                    $set: {
                        cart: userData.cart
                    }
                },{
                    new: true
                }
            )    
            res.json({
                data: response,
                index: index
            }) 
        }
        await updateQuantityById()
    }
    //  [PUT]       /update/favourite
    add_favourite = async (req, res, next) => {
        const { userId, productId } = await req.body
        const data = await UserSchema.findById(userId)
        if(!data?.favourite.products.includes(productId)){
            const response = await UserSchema.findByIdAndUpdate(
                userId,
                {
                    $push: {
                        'favourite.products': productId
                    }
                },{
                    new: true
                }
            )
            res.json(response)
        }else{
            res.json('error')
        }
    }
    //  [PUT]       /remove/favourite
    remove_fovourite = async (req, res, next) => {
        const { userId, productId } = await req.body
        const data = await UserSchema.findById(userId)
        if(data?.favourite.products.includes(productId)){
            const response = await UserSchema.findByIdAndUpdate(
                userId,
                {
                    $pull: {
                        'favourite.products': productId
                    }
                },{
                    new: true
                }
            )
            res.json(response)
        }else{
            res.json('error')
        }
    }
    //  [POST]      /push/cart
    pust_cart = async (req, res, next) => {
        const { userId, productId, nameProduct, price, promote } = await req.body
        const check = await UserSchema.findById(userId)
        let isOnCart = true
        check.cart.forEach((item) => {
            if(item._id === productId){
                isOnCart = false
            }
        })
        if(isOnCart){
            const response = await UserSchema.findByIdAndUpdate(
                userId,
                {
                    $push: {
                        cart: {
                            _id: productId,
                            name: nameProduct,
                            quantity: 1,
                            price: price,
                            promote: promote
                        }
                    }
                },{
                    new: true
                }
            )
            res.json(response)
        }else{
            res.json(check)
        }
    }
    index = async (req, res, next) => {
        const data = await UserSchema.findByIdAndUpdate(
            '6513ff0464bec24ac93a36cb',
            {
                $set: {
                    promoteCodes: [
                        {
                            discount: 10,
                            expiry: new Date().now
                        },
                        {
                            discount: 20,
                            expiry: new Date().now
                        },
                        {
                            discount: 30,
                            expiry: new Date().now
                        }
                    ]
                }
            },{
                new: true
            }
        )
        res.json(data)
    }
}


module.exports = new ProductController;
// chỉnh sửa ở 686
