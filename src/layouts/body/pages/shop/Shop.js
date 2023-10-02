import React, { useContext, useEffect, useState, memo, useRef } from "react";
import styles from "./shop.module.scss"
import GlobalContext from "../../../../hooks/globalContexts/GlobalContext";
import Tippy from "@tippyjs/react/headless"
import { useNavigate } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getAPI from "../../../../server/axios/getAPI";
import postAPI from "../../../../server/axios/postAPI"
import { faAngleDoubleRight, faChevronRight, faHeart } from "@fortawesome/free-solid-svg-icons";
import putAPI from "../../../../server/axios/putAPI";

function Shop() {

    const { IP, userData, setUserData } = useContext(GlobalContext)
    const [listProduct, setListProduct] = useState([])
    // const [userCart, setUserCart] = useState([])
    const [filteredProduct, setFilteredProduct] = useState([])
    const [type, setType] = useState('all')

    const navigate = useNavigate()

    const types = useRef([{
        type: 'dessert',
        name: 'Tráng miệng'
    }, {
        type: 'tea',
        name: 'Trà'
    }, {
        type: 'juice',
        name: 'Nước ép'
    }, {
        type: 'smoothie',
        name: 'Sinh tố'
    }, {
        type: 'fruit',
        name: 'Trái cây'
    }, {
        type: 'fast-food',
        name: 'Thức ăn nhanh'
    }, {
        type: 'all',
        name: 'Tất cả'
    }])
    useEffect(() => {
        getAPI(`http://${IP}:5000/api/product/get`, {}, null, (response) => {
            setListProduct(response)
            setFilteredProduct(response)
            console.log(response)
        })
    }, [])
    useEffect(() => {
        const filtered = listProduct.filter(item => item?.type.includes(type))
        setFilteredProduct(filtered)
        if (type !== 'all') {
        } else {
            setFilteredProduct(listProduct)
        }
    }, [type])

    const ProductTag = memo(({ id, name, price, quantity, image, sold, type = [], unit = 'phần' }) => {

        // const isFavourite = true
        const [isFavourite, setIsFavourite] = useState(userData?.favourite?.products?.includes(id))
        const [isOnCart, setIsOnCart] = useState(false)
        const [promote, setPromote] = useState(10)

        useEffect(() => {
            userData?.cart?.forEach(item => {
                if (item._id === id) {
                    setIsOnCart(true)
                }
            })
        }, [])

        const onToogleFavourite = () => {
            setIsFavourite(!isFavourite)
            // gọi API update ở đây luôn
            if (!isFavourite) {
                putAPI(`http://${IP}:5000/api/product/update/favourite`, {
                    userId: userData?._id,
                    productId: id
                }, (response) => {
                    setUserData(response)
                })

            } else {
                putAPI(`http://${IP}:5000/api/product/remove/favourite`, {
                    userId: userData?._id,
                    productId: id
                }, (response) => {
                    setUserData(response)
                })
            }
        }
        const onPushToCart = () => {
            // gọi API thêm sản phẩm vào giỏ hàng
            postAPI(`http://${IP}:5000/api/product/push/cart`, {
                userId: userData?._id,
                productId: id,
                nameProduct: name,
                price: price,
                promote: promote
            }, (response) => {
                setUserData(response)
                console.log(response.cart)
            })
        }
        const onPullToCart = () => {
            // gọi API xóa sản phẩm vào giỏ hàng
            postAPI(`http://${IP}:5000/api/product/pull/cart`, {
                userId: userData?._id,
                productId: id,
                nameProduct: name,
                price: price,
                promote: promote
            }, (response) => {
                setUserData(response)
                console.log(response.cart)
            })

            console.log('xóa khỏi giỏ hàng');
        }


        return (
            <div className={styles.productTag}>
                <div className={styles.image}>
                    <img src={image ? image : 'https://img6.thuthuatphanmem.vn/uploads/2022/11/17/anh-chibi-cute_014001732.png'} />
                </div>
                <div className={styles.info}>
                    <p className={styles.name}>{name}</p>
                    <p className={styles.price}>{price.toLocaleString('vi-VN')}đ / {unit}</p>
                    <p className={styles.quantity}>{`( Còn lại: ${quantity} )`}</p>
                    <div className={styles.add}>
                        <button style={{
                            backgroundColor: (isOnCart ? '#c4c4fa' : 'transparent'),
                            color: (isOnCart ? 'black' : '#c4c4fa')
                        }} onClick={!isOnCart ? onPushToCart : onPullToCart}>{isOnCart ? 'Đã thêm vào giỏ hàng' : 'Thêm vào giỏ hàng'}</button>
                    </div>
                </div>
                <div className={styles.favourite} onClick={onToogleFavourite}>
                    <FontAwesomeIcon color={(isFavourite ? 'red' : 'white')} icon={faHeart} />
                </div>
            </div>
        )
    })
    const TypeTag = memo(({ typed, name }) => {

        const [isSelect, setIsSelect] = useState(false)
        useEffect(() => {
            if ((typed === type)) {
                setIsSelect(true)
            } else {
                setIsSelect(false)
            }
        }, [typed])

        const onFilter = () => {
            setType(typed)
        }
        return (
            <div onClick={onFilter} style={{
                backgroundColor: (isSelect ? '#c4c4fa' : 'transparent'),
            }} className={styles.typeTag}>
                <p style={{
                    color: (isSelect ? 'black' : 'white')
                }}>{name}</p>
            </div>
        )
    })

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <p>Cửa hàng</p>
            </div>
            <div className={styles.typeTagWrapper}>
                {types.current.map((item => {
                    return <TypeTag key={item.name} typed={item.type} name={item.name} />
                }))}
                <div onClick={() => navigate('/shop/cart')} className={styles.typeTag}>
                    <p>Trang thanh toán <FontAwesomeIcon icon={faAngleDoubleRight} /></p>
                </div>
            </div>
            <div className={styles.contents}>
                {filteredProduct?.map((item, index) => {
                    return <ProductTag
                        key={item._id}
                        id={item._id}
                        name={item.name}
                        price={item.price}
                        quantity={item.quantity}
                        image={item.img}
                        sold={item.sold}
                        type={item.type}
                        unit={item?.unit}
                    />
                })}
            </div>
        </div>
    );
}

export default Shop;