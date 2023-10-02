import React, { useContext, useEffect, useState } from "react";
import styles from "./login.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons"
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../../../hooks/globalContexts/GlobalContext";
import postAPI from "../../../../server/axios/postAPI";

function Login() {

    const [hide, setHide] = useState(true)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [onOK, setOnOK] = useState(false)

    const navigate = useNavigate()
    const { IP, setUserData, userData } = useContext(GlobalContext)

    const onSubmit = () => {
        // gọi API login
        postAPI(`http://${IP}:5000/api/user/login`, {
            username: username,
            password: password
        }, (response) => {
            if(response.userData){
                setUserData(response.userData)
                navigate('/')
                localStorage.setItem('accessToken', response.UID)
            }
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.allForm}>
                    <div className={styles.title}>
                        <p>Đăng nhập</p>
                    </div>
                    <div className={styles.contents}>
                        <div className={styles.form}>
                            <FontAwesomeIcon icon={faUser} />
                            <input onChange={(e) => setUsername(e.target.value)} type={'text'} placeholder={"Tên đăng nhập"} />
                        </div>
                        <div className={styles.form}>
                            <FontAwesomeIcon icon={faLock} />
                            <input onChange={(e) => setPassword(e.target.value)} type={(hide ? 'password' : 'text')} placeholder={"Mật khẩu"} />
                            {hide ? <FontAwesomeIcon onClick={() => setHide(!hide)} style={{ cursor: 'pointer' }} icon={faEyeSlash} /> : <FontAwesomeIcon onClick={() => setHide(!hide)} style={{ cursor: 'pointer' }} icon={faEye} />}
                        </div>
                        <div className={styles.term}>
                            <input onClick={() => setOnOK(!onOK)} type="checkbox"></input>
                            <p>Ghi nhớ cho lần đăng nhập lần sau</p>
                        </div>
                        <div className={styles.submit} onClick={onSubmit}>
                            <button>Đăng nhập</button>
                        </div>
                        <div className={styles.more}>
                            <div className={styles.fb}>
                                <FontAwesomeIcon icon={faFacebook} />
                            </div>
                            <div className={styles.google}>
                                <FontAwesomeIcon icon={faGoogle} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.img}>
                    <img src="https://1000logos.net/wp-content/uploads/2020/08/MongoDB-Emblem.jpg"></img>
                </div>
            </div>
        </div>
    );
}

export default Login;