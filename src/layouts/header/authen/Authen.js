import React, { useContext, useEffect, useState } from "react";
import styles from "./authen.module.scss"
// import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAnglesLeft, faBell, faCartShopping, faGears, faHeart, faPersonRunning, faUser } from "@fortawesome/free-solid-svg-icons"
import Tippy from "@tippyjs/react/headless"

import { Link, useNavigate } from "react-router-dom"
import GlobalContext from "../../../hooks/globalContexts/GlobalContext";
import Modal from "../../../hooks/modal/Modal";

function Authen() {

    const { userData, setUserData } = useContext(GlobalContext)
    const [showModal, setShowModal] = useState(false)
    const [contentModal, setContentModal] = useState('')
    const navigate = useNavigate()


    const onLogout = () => {
        localStorage.removeItem('accessToken')
        setUserData(null)
        setShowModal(false)
    }
    const tools = [
        {
            icon: <FontAwesomeIcon className={styles.icon} icon={faCartShopping} />,
            url: '/user/cart'
        },
        {
            icon: <FontAwesomeIcon className={styles.icon} icon={faBell} />,
            url: '/user/notifications'
        },
    ]
    const userTools = [
        { 
            icon: <FontAwesomeIcon icon={faUser}/>,
            title: 'Thông tin người dùng',
            url: `/user/informations`,
            action: (url) => {
                navigate(url)
            }
        },{ 
            icon: <FontAwesomeIcon icon={faHeart}/>,
            title: 'Yêu thích',
            url: '/user/favourite',
            action: (url) => {
                navigate(url)
            }
        },{ 
            icon: <FontAwesomeIcon icon={faGears}/>,
            title: 'Cài đặt',
            url: '/user/settings',
            action: (url) => {
                navigate(url)
            }
        },{ 
            icon: <FontAwesomeIcon icon={faPersonRunning}/>,
            title: 'Đăng xuất',
            url: '',
            action: () => {
                setContentModal('Bạn có chắc muốn đăng xuất tài khoản?')
                setShowModal(true)
            }
        },
    ]

    function UserToolTag({ icon, title, url, action }){

        return (
            <div onClick={() => action(url)} className={styles.userToolTag}>
                <p>{icon} {title}</p>
            </div>
        )
    }

    function Tool() {
        function Tag({ icon, url }) {

            const onNavigate = () => {
                navigate(url)
            }

            return (
                <div onClick={onNavigate} className={styles.toolTag}>
                    {icon}
                </div>
            )
        }
        return (
            <div className={styles.tool}>
                {tools.map((item, index) => {
                    return <Tag key={index} icon={item.icon} url={item.url} />
                })}
                <Tippy
                    interactive={true}
                    offset={[0, 0]}
                    render={attr => (
                        <div tabIndex={-1} {...attr} className={styles.userWrapper}>
                            {userTools.map((item, index) => {
                                return <UserToolTag 
                                    key={index}
                                    icon={item.icon}
                                    title={item.title}
                                    url={item.url}
                                    action={item.action}
                                />
                            })}
                        </div>
                    )}
                >
                    <div className={styles.toolTag} onClick={() => navigate('/shop')}>
                        <img src={userData?.avatar} className={styles.icon} />
                    </div>
                </Tippy>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            {!userData ? (
                <div className={styles.authen}>
                    <div className={styles.toRegis}>
                        <Link to={"/register"}>Đăng ký</Link>
                    </div>
                    <div className={styles.toLogin}>
                        <Link to={"/login"}>Đăng nhập</Link>
                    </div>
                </div>
            ) : <Tool />}
            <Modal
                showModal={showModal}
                content={contentModal}
                onAccept={onLogout}
                onReject={() => setShowModal(false)}
            />
        </div>
    );
}

export default Authen;