import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faHeart, faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";
import Logo from "./Logo";

export default function Header() {
    return (
        <div className="mt-6 mb-6 mx-5 w-full flex flex-row items-center">
            <Logo />

            <nav className="flex flex-row w-3/4 justify-evenly">
                <Link href="/search"><FontAwesomeIcon icon={faMagnifyingGlass} width="30" /></Link>
                <Link href="favorites"><FontAwesomeIcon icon={faHeart} width="30" /></Link>
                <div><FontAwesomeIcon icon={faCircleHalfStroke} width="30" /></div>
            </nav>
        </div>
    )
}
