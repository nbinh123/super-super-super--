import React, { useContext, useEffect, useState } from "react";
import styles from "./body.module.scss"
import { Routes, Route } from "react-router-dom"

// components
import Login from "./pages/login/Login";
import Regis from "./pages/register/Regis";
import Detail from "./pages/detail/Detail";
import GlobalContext from "../../hooks/globalContexts/GlobalContext";
import Favourite from "./pages/favourite/Favourite";
import Info from "./pages/info/Info";
import Settings from "./pages/settings/Settings";
import Cart from "./pages/cart/Cart";
import Shop from "./pages/shop/Shop";
import Bill from "./pages/shop/bill/Bill";

function Body() {

    const { userData } = useContext(GlobalContext)

    return (
        <div className={styles.container}>
            <Routes>
                {!userData ? <Route path="/login" element={<Login />} /> : ""}
                {!userData ? <Route path="/register" element={<Regis />} /> : ""}
                <Route path="/:type/info/:_id" element={<Detail />} />
                <Route path="/user">
                    <Route path="favourite" element={<Favourite />} />
                    <Route path="informations" element={<Info />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="cart" element={<Cart />} />
                </Route>
                <Route path="/shop">
                    <Route path="" element={<Shop/>}/>
                    <Route path="cart" element={<Bill/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default Body;