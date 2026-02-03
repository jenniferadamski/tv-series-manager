import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faHeart, faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";
import Logo from "./Logo";

export default function Header() {
    return (
        <div className="my-6 lg:mt-8 lg:mb-12 ml-5 md:ml-0 mr-0 flex flex-row items-center md:justify-between">
            <Logo />

            <nav className="flex flex-row w-3/4 md:w-1/2 justify-evenly">
                <Link href="/search"><FontAwesomeIcon icon={faMagnifyingGlass} width="30" /></Link>
                <Link href="favorites"><FontAwesomeIcon icon={faHeart} width="30" /></Link>
                <div><FontAwesomeIcon icon={faCircleHalfStroke} width="30" /></div>
            </nav>
        </div>
    )
}
