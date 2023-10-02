import React, { useContext, useEffect, useState, memo } from "react";
import styles from "./bill.module.scss";
import GlobalContext from "../../../../../hooks/globalContexts/GlobalContext";
import getAPI from "../../../../../server/axios/getAPI";
import putAPI from "../../../../../server/axios/putAPI";
import postAPI from "../../../../../server/axios/postAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlug, faPlus } from "@fortawesome/free-solid-svg-icons"
import Tippy from "@tippyjs/react/headless"


function Bill() {

    const { IP, userData, setUserData } = useContext(GlobalContext)
    const [promote, setPromote] = useState(0)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        let newObj = userData?.cart
        let total = 0
        newObj?.forEach((item) => {
            total += ((item.quantity * item.price) * ((100 - item.promote) / 100))
        })
        setTotal(total)
    }, [])
    // console.log(userData.promoteCodes)



    const ProductTag = memo(({ id, unit = 'phần', quantities, productPromote }) => {

        const [productInfo, setProductInfo] = useState(null)
        const [quantity, setQuantity] = useState(quantities)
        // const [productPromote, setProductPromote] = useState(0)

        useEffect(() => {
            getAPI(`http://${IP}:5000/api/product/read`, {
                id: id
            }, setProductInfo)
        }, [])


        const onIncQuantity = () => {
            setQuantity(quantity + 1)
        }
        const onDecQuantity = () => {
            if (quantity > 0) {
                setQuantity(quantity - 1)
            }
        }
        const onUpdateQuantity = () => {
            // gọi API update số lượng sản phẩm trong đơn hàng của người dùng
            putAPI(`http://${IP}:5000/api/product/update/quantity`, {
                userId: userData?._id,
                productId: id,
                quantity: quantity
            }, (response) => {
                // nếu bật cái này sẽ lỗi
                let obj = response.data.cart[response.index]
                setUserData(response.data)
                setProductInfo(obj)
                let newObj = response.data.cart
                let total = 0
                newObj.forEach((item) => {
                    total += ((item.quantity * item.price) * ((100 - item.promote) / 100))
                })
                setTotal(total)
            })
        }


        return (
            <div className={styles.productTag}>
                <div className={styles.image}>
                    <img src={productInfo?.image ? productInfo?.image : 'https://img6.thuthuatphanmem.vn/uploads/2022/11/17/anh-chibi-cute_014001732.png'} />
                </div>
                <div className={styles.info}>
                    <p className={styles.name}>{productInfo?.name}</p>
                    <p className={styles.price}>{productInfo?.price.toLocaleString('vi-VN')}đ / {unit}</p>
                    {/* <p className={styles.quantity}>Số lượng: {productInfo?.quantity}</p> */}
                    <div className={styles.tools}>
                        <div onClick={onDecQuantity} className={styles.dec}>
                            <FontAwesomeIcon color="white" icon={faMinus} />
                        </div>
                        <div className={styles.quantity}>
                            <input onChange={(e) => setQuantity(e.target.value)} type="number" value={quantity} />
                        </div>
                        <div onClick={onIncQuantity} className={styles.inc}>
                            <FontAwesomeIcon color="white" icon={faPlus} />
                        </div>
                    </div>
                </div>
                <div className={styles.total}>
                    <p>{quantity} x {productInfo?.price.toLocaleString('vi-VN')}đ</p>
                    <br />
                    {productPromote !== 0 ? <p className={styles.promote}>{(quantity * productInfo?.price).toLocaleString('vi-VN')}đ</p> : ''}
                    <p>{((quantity * productInfo?.price) * ((100 - productPromote) / 100)).toLocaleString('vi-VN')}đ {productPromote !== 0 ? <span>{`(-${productPromote}%)`}</span> : ''}</p>
                    {quantity != quantities ? (
                        <div onClick={onUpdateQuantity} className={styles.submit}>
                            <p>Xác nhận sản phẩm</p>
                        </div>
                    ) : ''}
                </div>
            </div>
        )
    })

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <p>Đơn hàng của bạn</p>
            </div>
            <div className={styles.contents}>
                <div className={styles.configs}>
                    <div className={styles.title}>
                        <p>Cài đặt</p>
                    </div>
                    <div className={styles.promoteCode}>
                        <div className={styles.titlePromote}>
                            <p>Mã giảm giá</p>
                        </div>
                        <Tippy
                            placement="bottom"
                            interactive={true}
                            offset={[0, 0]}
                            render={attr => (
                                <div tabIndex={-1} {...attr} className={styles.promoteCodeWrapper}>
                                    {userData?.promoteCodes.map((item, index) => {
                                        return (
                                            <div style={{
                                                backgroundColor: (promote === item.discount ? 'antiquewhite' : 'transparent')
                                            }} className={styles.code} key={index} onClick={() => setPromote(item.discount)}>
                                                <p style={{
                                                    color: (promote === item.discount ? 'black' : 'white')
                                                }}>Mã giảm giá {item?.discount}%</p>
                                            </div>
                                        )
                                    })}
                                    <div className={styles.code} onClick={() => setPromote(0)}>
                                        <p>Không</p>
                                    </div>
                                </div>
                            )}
                        >
                            <div className={styles.promote}>
                                <p>Giảm {promote}%</p>
                            </div>
                        </Tippy>
                    </div>
                </div>
                <div className={styles.bill}>
                    <div className={styles.title}>
                        <p>Thông tin đơn hàng</p>
                    </div>
                    <div className={styles.products}>
                        {userData?.cart.map(item => {
                            return <ProductTag
                                id={item._id}
                                key={item._id}
                                quantities={item.quantity}
                                productPromote={item.promote}
                            />
                        })}
                    </div>
                    <div className={styles.total}>
                        <div className={styles.tc}>
                            <p>Tổng cộng: {promote !== 0 ? `(-${promote}%)` : ''}</p>
                        </div>
                        <div className={styles.totalCost}>
                            <p>{(total * (100 - promote) / 100).toLocaleString('vi-VN')}đ</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Bill;