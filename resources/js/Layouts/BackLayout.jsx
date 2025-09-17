import BtnRemonter from "@/Components/btnRemonter/btn";
import Nav from "@/Components/nav/Nav";
import React from "react";

export default function BackLayout({ children }) {
    return (
        <>
            <Nav />
            <main id="main">{children}</main>
            <BtnRemonter/>
        </>
    );
}
