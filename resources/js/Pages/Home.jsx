import FrontLayout from "@/Layouts/FrontLayout";
import React from "react";

export default function Home() {
    return <div>home</div>;
}

Home.layout = (page) => <FrontLayout>{page}</FrontLayout>;
