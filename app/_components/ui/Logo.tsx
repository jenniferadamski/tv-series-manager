import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/" className="science-gothic-logo flex flex-col items-center uppercase text-xs w-1/4 lg:w-1/6 mr-6 dark:text-[#EBECF0]">
            <span>TV</span>
            <span className="text-2xl text-[#0f396d] dark:text-[#4b83c6]">Series</span>
            <span>Manager</span>
        </Link>
    )
}