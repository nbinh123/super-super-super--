import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import styles from "./search.module.scss"
import GlobalContext from "../../../hooks/globalContexts/GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"

import Tippy from "@tippyjs/react/headless"
import getAPI from "../../../server/axios/getAPI";


function Search() {

    const [type, setType] = useState('product')
    const [inpValue, setInpValue] = useState("")
    const [searchValue, setSearchValue] = useState([])
    const [timerId, setTimerId] = useState(null)

    const { IP } = useContext(GlobalContext)
    const navigate = useNavigate()

    const onSearch = (e) => {

        if (timerId) {
            clearTimeout(timerId)
        }
        const newTimer = setTimeout(() => {
            // gọi API lấy dữ liệu ở đây
            switch (type) {
                case "product":
                    getAPI(`http://${IP}:5000/api/product/find`, {
                        keyword: e.target.value
                    }, null, (data) => {
                        setSearchValue(data)

                    })
                    break;
                case "room":
                    getAPI(`http://${IP}:5000/api/room/find_name`, {
                        name: e.target.value
                    }, null, (data) => {
                        setSearchValue(data)
                    })
                    break;
                case "user":
                    getAPI(`http://${IP}:5000/api/user/search`, {
                        phone: e.target.value
                    }, null, (data) => {
                        setSearchValue(data)
                    })
                    break;
                default:
                    break;
            }
        }, 700);
        setTimerId(newTimer)
        setInpValue(e.target.value)
    }

    function SearchTag({ name, phone, avatar, price, _id, type }) {
        
        const onShowMoreInfo = () => {
            setSearchValue([])
            setInpValue('')
            navigate(`/${type}/info/${_id}`)
        }

        return (
            <div className={styles.search_tag} onClick={onShowMoreInfo}>
                <div className={styles.avatar}>
                    <img src={avatar} />
                </div>
                <div className={styles.info}>
                    <p className={styles.name}>{name ? name : "Người dùng ẩn danh"}</p>
                    {phone ? (
                        <p className={styles.phone}>{phone}</p>
                    ) : ""}
                    {price ? (
                        <p className={styles.phone}>{price ? `${price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}` : ""}</p>
                    ) : ""}
                </div>
            </div>
        )
    }


    return (
        <div className={styles.container}>
            <Tippy
                placement="bottom"
                interactive={true}
                visible={searchValue.length > 0 && inpValue.length > 0}
                onClickOutside={() => setInpValue('')}
                offset={[0, 0]}
                render={attr => (
                    <div className={styles.searchValue} tabIndex="-1" {...attr}>
                        {searchValue.map((item, index) => {
                            if(index < 5){
                                return <SearchTag
                                key={index}
                                name={item.name}
                                phone={item.phone}
                                avatar={item.avatar}
                                price={item.price}
                                _id={item._id}
                                type={type}
                            />
                            }
                        })}
                    </div>
                )}
            >
                <input
                    type="text"
                    onChange={(e) => onSearch(e)}
                    value={inpValue}
                />
            </Tippy>
            <Tippy
                placement="bottom"
                interactive={true}
                offset={[0, 0]}
                render={attr => (
                    <div className={styles.filter} tabIndex="-1" {...attr}>
                        <div className={styles.select}>
                            <input onClick={() => setType("product")} type="radio" value={"product"} name="i" />
                            <p>Sản phẩm</p>
                        </div>
                        <div className={styles.select}>
                            <input onClick={() => setType("user")} type="radio" value={"user"} name="i" />
                            <p>Người dùng</p>
                        </div>
                        <div className={styles.select}>
                            <input onClick={() => setType("room")} type="radio" value={"user"} name="i" />
                            <p>Phòng</p>
                        </div>
                    </div>
                )}
            >
                <button>Tìm kiếm <FontAwesomeIcon icon={faCaretDown} /></button>
            </Tippy>
        </div>
    );
}

export default Search;