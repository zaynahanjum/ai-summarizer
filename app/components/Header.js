"use client"

import { useRouter } from "next/navigation"
export default function Header() {

    return (
        <div className="max-w-[90%] mx-auto py-6 flex flex-row justify-between">
            <div>
                <img className="w-30" src="logo.webp"></img>
            </div>
            <div className="self-center flex flex-row gap-10">
                <NavItem title={"Home"} link={"/"} />
                <NavItem title={"Extension"} link={"/extension"} />
                <NavItem title={"Live Demo"} link={"/"} />
                <NavItem title={"Help"} link={"/help"} />
                <NavItem title={"Share"} link={"/share"} />
                <NavItem title={"Rate"} link={"/"} />
            </div>
            <div className="w-30"></div>
        </div>
    )
}

function NavItem({ title, link }) {
    const router = useRouter();
    return (
        <div>
            <p onClick={() => {
                router.push(link)
            }} className="cursor-pointer font-bold">
                {title}
            </p>
        </div>
    )
}