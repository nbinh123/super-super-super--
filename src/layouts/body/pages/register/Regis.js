import React, { useContext, useState } from "react";
import styles from "./regis.module.scss"
import clsx from "clsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faPhone, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import GlobalContext from "../../../../hooks/globalContexts/GlobalContext";

function Regis() {

    const [error, setError] = useState('')
    const { IP } = useContext(GlobalContext)
    const action = `http://${IP}:5000/api/user/register`

    function Input({ icon, placeholder, name, type = 'text' }) {

        const [hide, setHide] = useState(true)

        return (
            <div className={styles.form}>
                <FontAwesomeIcon icon={icon} />
                <input type={(type === 'text' ? 'text' : (hide ? 'password' : 'text'))} name={name} placeholder={placeholder} />
                {type === 'password' ? (!hide ? <FontAwesomeIcon onClick={() => setHide(!hide)} style={{ cursor: 'pointer' }} icon={faEye}/> : 
                <FontAwesomeIcon onClick={() => setHide(!hide)} style={{ cursor: 'pointer' }} icon={faEyeSlash}/>) : ""}
            </div>
        )
    }


    return (
        <div className={styles.container}>
            <form method="post" action={action} className={styles.main}>
                <div className={styles.allForm}>
                    <div className={clsx(styles.title, {
                        [styles.error]: (error !== ''),
                    })}>
                        <p>Đăng ký</p>
                    </div>
                    <div className={styles.contents}>
                        {/* <div className={styles.form}>
                        <FontAwesomeIcon icon={faUser} />
                        <input placeholder="Tên đăng nhập" />
                    </div> */}
                        <Input name={"username"} icon={faUser} placeholder={"Tên đăng nhập"} />
                        <Input name={"phone"} icon={faPhone} placeholder={"Số điện thoại"} />
                        <Input type="password" name={"password"} icon={faLock} placeholder={"Mật khẩu"} />
                        <Input type="password" icon={faLock} placeholder={"Nhập lại mật khẩu"} />
                    </div>
                    <div className={styles.term}>
                        <input type="checkbox"></input>
                        <p>Tôi đồng ý với tất cả điều khoản</p>
                    </div>
                    <div className={styles.submit}>
                        <button>Đăng ký</button>
                    </div>
                </div>
                <div className={styles.img}>
                    <img src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signup-image.jpg"></img>
                </div>
            </form>
        </div>
    );
}

export default Regis;