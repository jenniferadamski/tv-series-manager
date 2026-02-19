import Link from "next/link";
import Logo from "./Logo";
import ThemeButton from "./ThemeButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faHeart } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
    return (
        <div className="my-6 lg:mt-8 lg:mb-12 ml-5 md:ml-0 mr-0 flex flex-row items-center md:justify-between">
            <Logo />

            <nav className="flex flex-row w-3/4 md:w-1/2 justify-evenly">
                <Link href="/search" className="flex items-center">
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        width={30}
                        className="min-w-[30px] min-h-[30px] shrink-0 dark:text-[#EBECF0]"
                    />
                </Link>

                <Link href="/favorites" className="flex items-center">
                    <FontAwesomeIcon
                        icon={faHeart}
                        width={30}
                        className="min-w-[30px] min-h-[30px] shrink-0 dark:text-[#EBECF0]"
                    />
                </Link>

                <ThemeButton />
            </nav>
        </div>
    )
}
