const express = require("express")
const router = express.Router()

const ProductController = require("../../controllers/ProductController")

router.get('/get', ProductController.get)
router.get('/search', ProductController.search)
router.get('/find', ProductController.search_with_keyword)
router.get('/read', ProductController.read)

router.post('/arrange', ProductController.arrange)
router.post('/push/cart', ProductController.pust_cart)

router.put('/update/favourite', ProductController.add_favourite)
router.put('/update/quantity', ProductController.update_quanlity)
router.put('/remove/favourite', ProductController.remove_fovourite)

router.get('/', ProductController.index)


module.exports = router