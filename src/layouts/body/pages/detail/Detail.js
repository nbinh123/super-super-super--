import React, { useContext, useEffect, useState } from "react";
import styles from "./detail.module.scss"
import { useParams } from "react-router-dom";
import getAPI from "../../../../server/axios/getAPI";
import GlobalContext from "../../../../hooks/globalContexts/GlobalContext";

function Detail() {

    const { type, _id } = useParams()
    const { IP } = useContext(GlobalContext)
    const [info, setInfo] = useState(null)

    useEffect(() => {
        switch (type) {
            case "product":
                getAPI(`http://${IP}:5000/api/product/read`, {
                    id: _id
                }, null, (data) => {
                    setInfo(data)
                })
                break;
            case "user":
                getAPI(`http://${IP}:5000/api/user/find_by_id`, {
                    id: _id,
                }, null, (data) => {
                    setInfo(data)
                })
                break;
            case "room":
                getAPI(`http://${IP}:5000/api/room/find`, {
                    id: _id
                }, null, (data) => {
                    setInfo(data)
                })
                break;
            default:
                break;
        }
    }, [_id])

    function Product(){
        return(
            <div className={styles.product}>
                <p>{info?.name}</p>
            </div>
        )
    }
    function User(){

    }
    function Room(){
        
    }

    return (
        <div className={styles.container}>
            {type === "product" ? <Product/> : (type === "user" ? <User/> : <Room/>)}
        </div>
    );
}

export default Detail;