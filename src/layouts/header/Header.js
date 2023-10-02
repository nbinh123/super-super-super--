import React, { useContext, useEffect } from "react";
import styles from "./header.module.scss"
import GlobalContext from "../../hooks/globalContexts/GlobalContext";
import Search from "./search/Search";
import Menu from "./menu/Menu";
import Authen from "./authen/Authen";
import { useNavigate } from "react-router-dom";

function Header() {

    const { IP } = useContext(GlobalContext)
    const { userData } = useContext(GlobalContext)
    const navigate = useNavigate()

    return (
        <div className={styles.container}>
            {/* 4 phần: logo, search, navigate, authen */}
            <div className={styles.logo} onClick={() => navigate('/')}>
                <img src="https://drive.google.com/uc?id=1MavU5CSYSnKe-cwJuBRN7ULMlYhykuMg"/>
                <p>NBinh2_68</p>
            </div>
            <Search />
            {/* <Menu /> */}
            <Authen />
        </div>
    );
}

export default Header;