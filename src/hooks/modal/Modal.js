import React, { useState } from "react";
import styles from "./modal.module.scss"

function Modal({
    title = 'Thông báo',
    content = 'Đây là dòng nội dung của modal',
    onAccept = () => { },
    onReject = () => {

    },
    showModal = false
}) {
    return (
        <div className={styles.container} style={{
            width: "100%",
            height: "100%",
            display: (showModal ? 'flex' : 'none')
        }}>
            <div className={styles.main}>
                <div className={styles.title}>
                    <p>{title}</p>
                </div>
                <div className={styles.content}>
                    <p>{content}</p>
                </div>
                <div className={styles.chooses}>
                    <div className={styles.acp}>
                        <p onClick={onAccept}>Đồng ý</p>
                    </div>
                    <div className={styles.rej}>
                        <p onClick={onReject}>Từ chối</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;