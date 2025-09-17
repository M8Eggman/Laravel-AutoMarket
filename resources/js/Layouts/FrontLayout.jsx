import BtnRemonter from "@/Components/btnRemonter/btn";
import Footer from "@/Components/footer/Footer";
import Nav from "@/Components/nav/Nav";
import React from "react";

export default function FrontLayout({ children }) {
    return (
        <>
            <Nav />
            <main id="main">{children}</main>
            <Footer />
            <BtnRemonter />
        </>
    );
}
