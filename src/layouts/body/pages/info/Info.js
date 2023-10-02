import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./info.module.scss"
import GlobalContext from "../../../../hooks/globalContexts/GlobalContext";
import Tippy from "@tippyjs/react/headless"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faPen } from "@fortawesome/free-solid-svg-icons"
import putAPI from "../../../../server/axios/putAPI";

function Info() {

    const { IP, userData, setUserData } = useContext(GlobalContext)
    const [name, setName] = useState(userData?.name ? userData?.name : userData?.username)
    const [timer, setTimer] = useState(null)
    const [avatar, setAvatar] = useState(null)

    const actionAvatarForm = `http://${IP}:5000/api/user/upload/avatar`

    useEffect(() => {
        setName(userData?.name ? userData?.name : userData?.username)
    }, [userData?.name])
    useEffect(() => {
        setAvatar(userData?.avatar)
    },[userData?.avatar])

    const imageRef = useRef()
    const inpRef = useRef()
    const formCurrent = useRef()

    
    const watchAvatar = () => {
        window.open(avatar ? avatar : '');
    }
    const submitAvatar = async (e) => {
        // formCurrent.current.preventDefault()
        formCurrent.current.submit()
    }
    const onEditName = () => {
        inpRef.current.focus()
    }
    const changeName = (e) => {
        setName(e.target.value)
        if (timer) {
            clearTimeout(timer)
        }
        const newTimer = setTimeout(() => {
            // gọi API chỉnh sửa tên và cập nhật /edit/info
            putAPI(`http://${IP}:5000/api/user/edit/info`, {
                id: userData?._id,
                nameKey: 'name',
                value: e.target.value
            }, (response) => {
                setUserData(response)
            })
        }, 700);
        setTimer(newTimer)
    }
    const changeAvatar = (e) => {

        const file = imageRef.current.files[0];
        const reader = new FileReader();
        reader.onload = function (event) {
            const imageUrl = event.target.result;
            setAvatar(imageUrl)
        };
        reader.readAsDataURL(file)

    }

    return (
        <div className={styles.container}>
            <div className={styles.avatar}>
                <Tippy
                    placement="right"
                    interactive={true}
                    // visible={true}
                    render={attr => (
                        <div tabIndex={-1} {...attr} className={styles.avatarOptions}>
                            <div className={styles.watch} onClick={(userData?.avatar === avatar ? watchAvatar : submitAvatar)}>
                                <p>{userData?.avatar !== avatar ? <span>Xác nhận <FontAwesomeIcon color="lightgreen" icon={faCheck} /></span> : 'Xem ảnh'}</p>
                            </div>
                            <form
                                ref={formCurrent}
                                method="POST"
                                action={actionAvatarForm}
                                encType="multipart/form-data"
                                onClick={() => imageRef.current.click()}
                                onSubmit={(e) => e.preventDefault()}
                                className={styles.edit}
                            >
                                <p>Thay đổi ảnh đại diện</p>
                                <input style={{ display: 'none' }} name="avatar" onChange={(e) => changeAvatar(e)} ref={imageRef} type="file" />
                                <input type="hidden" name="id" value={userData?._id}></input>
                            </form>
                        </div>
                    )}
                >
                    <img src={avatar} />
                </Tippy>
            </div>
            <div className={styles.contents}>
                <div className={styles.name}>
                    {/* <p>{userData?.name ? userData?.name : userData?.username}</p> */}
                    <input onChange={(e) => changeName(e)} ref={inpRef} value={name} />
                    <FontAwesomeIcon onClick={onEditName} className={styles.pen} icon={faPen} />
                </div>
            </div>
        </div>
    );
}

export default Info;