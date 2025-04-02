"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function HeaderWrapper() {
    const pathname = usePathname();

    const hideHeaderOnRoutes = ["/image_details", "/submit_image"];

    if (hideHeaderOnRoutes.some(route => pathname.startsWith(route))) {
        return null
    } else if (pathname === "/") {
        return null
    };

    return <Header />;
}
